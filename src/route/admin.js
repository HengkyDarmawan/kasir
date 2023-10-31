import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { NavbarComponent } from "../component";
import { Admin } from '../pages';

export default function App(props) {

    let {path} = useRouteMatch();

    return (
        <React.Fragment>
            <NavbarComponent />
            <main>
                <Switch>
                    <Route path={path} component={Admin} exact />
                    <Route path={`${path}/product`} component={<h1>Produk</h1>} />
                    <Route path={`${path}/category`} component={<h1>Category</h1>} />
                    <Route path={`${path}/account`} component={<h1>Account</h1>} />
                </Switch>
            </main>
        </React.Fragment>
    );
}