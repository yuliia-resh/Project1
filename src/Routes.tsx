import React from "react";
import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";

import Cart from "./shared/components/Cart/Cart";
import Dishes from "./shared/components/Dishes/Dishes";
import Header from "./shared/components/Header/Header";
import Loading from "./shared/components/Loading/Loading";
import { connect } from "./shared/connect";
import { PropsType } from "./shared/types/types";

export class Routes extends React.Component<PropsType> {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <BrowserRoutes>
            <Route path="/cart" element={<Cart />} />
          </BrowserRoutes>

          {this.props.store.isLoading ? <Loading /> : <Dishes />}
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(Routes);
