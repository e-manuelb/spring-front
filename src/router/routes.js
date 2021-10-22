import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Dashboard } from "../views/components/Dashboard";
import { HomeIndex } from "../views/pages/Home";

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Dashboard>
          <Route exact path="/" component={HomeIndex}></Route>
        </Dashboard>
      </Switch>
    </BrowserRouter>
  );
}
