import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavbarComponent } from "./component";
import { Home, Sukses } from './pages';
// import ReactPdfPrint from './ReactPdfPrint';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Sukses" component={Sukses} exact />
          </Switch>
        </main>
        {/* <ReactPdfPrint /> */}
      </BrowserRouter>
    )
  }
}