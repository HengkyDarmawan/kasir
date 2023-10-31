import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { NavbarComponent } from "../component";
import { Home, Sukses } from '../pages';
// import { useSelector } from "react-redux";

export default function App(props) {
    // let isAuthenticated = useSelector((state) => state.users.isAuthenticated);

    let {path} = useRouteMatch();

    return (
        <React.Fragment>
            <NavbarComponent />
            <main>
                <Switch>
                    <Route path={path} component={Home} exact />
                    <Route path={`${path}/Sukses`} component={Sukses} />
                </Switch>
            </main>
        </React.Fragment>
    );
}