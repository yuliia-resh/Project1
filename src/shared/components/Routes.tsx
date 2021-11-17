import { BrowserRouter, Route } from "react-router-dom";

import Cart from "./Cart/Cart";
import Dishes from "./Dishes/Dishes";
import Header from "./Header/Header";
import { connect } from "../connect";

function Routes() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route path="/cart"> {<Cart />} </Route>
        <Route path="/"> {<Dishes />} </Route>
      </div>
    </BrowserRouter>
  );
}

export default connect(Routes);
