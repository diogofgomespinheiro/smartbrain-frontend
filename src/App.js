import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecogniton/FaceRecogniton";
import axios from "./axios";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  clarifalData: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      clarifalData: [],
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }

  calculateFaceLocation = data => {
    const clarifalData = data.outputs[0].data.regions;
    this.setState({ clarifalData: clarifalData });
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    let boxes = [];
    for (let i = 0; i < clarifalData.length; i++) {
      let {
        age_appearance,
        gender_appearance,
        multicultural_appearance
      } = this.state.clarifalData[i].data.face;
      boxes.push({
        leftCol: clarifalData[i].region_info.bounding_box.left_col * width,
        topRow: clarifalData[i].region_info.bounding_box.top_row * height,
        rightCol:
          width - clarifalData[i].region_info.bounding_box.right_col * width,
        bottomRow:
          height - clarifalData[i].region_info.bounding_box.bottom_row * height,
        index: i,
        age: age_appearance.concepts[0],
        gender: gender_appearance.concepts[0],
        multicultural: multicultural_appearance.concepts[0]
      });
    }
    return boxes;
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes: boxes });
  };

  OnInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onMouseOver = event => {
    const {
      age_appearance,
      gender_appearance,
      multicultural_appearance
    } = this.state.clarifalData[event.target.id].data.face;
    this.setState({ age_appearance: age_appearance.concepts[0] });
    this.setState({ gender_appearance: gender_appearance.concepts });
    this.setState({
      multicultural_appearance: multicultural_appearance.concepts
    });
  };

  OnButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    axios
      .post("/profile/api", { input: this.state.input })
      .then(response => {
        axios
          .put(
            "/profile/entries",
            { id: this.state.user.id },
            { headers: { "Content-Type": "application/json" } }
          )
          .then(res => {
            this.setState(
              Object.assign(this.state.user, { entries: res.data })
            );
          })
          .catch(console.log);
        this.displayFaceBoxes(this.calculateFaceLocation(response.data));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route: route });
  };

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.OnInputChange}
              OnButtonSubmit={this.OnButtonSubmit}
            />
            <FaceRecognition
              boxes={boxes}
              imageUrl={imageUrl}
              mouseOver={this.onMouseOver}
            />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
