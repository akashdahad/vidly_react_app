import "./App.css";
import React, { Component } from "react";
import Movies from "./movies";

class App extends Component {
  state = {};
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}

export default App;
