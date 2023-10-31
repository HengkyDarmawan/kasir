import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from './pages';
import KasirRoute from "./route/kasir";
import AdminRoute from "./route/admin";
import ProtectedRoute from "./middleware/ProtectedRoute";

export default function App() {

  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/login" component={Login} exact />
          <ProtectedRoute>
            <Route path="/kasir" component={KasirRoute} />
            <Route path="/admin" component={AdminRoute} />
          </ProtectedRoute>
        </Switch>
      </main>
    </BrowserRouter>
  );
}
