import { BrowserRouter } from "react-router-dom";

import "./App.css";
import { connect } from "./connect";
import Header from "./components/Header/Header";
import Home from "./features/Home/Home";

function Routes() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default connect(Routes);
