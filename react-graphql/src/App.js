import React, { Component } from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
