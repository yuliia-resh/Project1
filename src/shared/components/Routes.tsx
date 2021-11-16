import React from "react";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";

import Cart from "./Cart/Cart";
import Dishes from "./Dishes/Dishes";
import Header from "./Header/Header";
import Loading from "./Loading/Loading";
import { connect } from "../connect";
import { PropsType } from "../types/types";

export class Routes extends React.Component<PropsType> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <BrowserRoutes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Dishes />} />
          </BrowserRoutes>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(Routes);
