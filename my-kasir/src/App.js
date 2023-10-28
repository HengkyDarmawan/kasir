import React, { Component } from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { NavbarComponent } from "./component";
import { Home, Sukses, Login } from './pages';

export default class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent/>
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login} />
            <Route path="/Sukses" component={Sukses} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}