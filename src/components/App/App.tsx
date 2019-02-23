import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "../../store";

// Components
import MainPage from "../MainPage/MainPage";
import Header from "../Header/Header";

const MainRoutes = () => (
  <React.Fragment>
    <Header />
    <MainPage />
  </React.Fragment>
);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={MainRoutes} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
