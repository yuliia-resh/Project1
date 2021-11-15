import React from "react";

import "./App.css";
import Store from "./shared/components/Store/Store";
import Routes from "./Routes";

class App extends React.Component {
  render() {
    return (
      <Store>
        <Routes />
      </Store>
    );
  }
}

export default App;
