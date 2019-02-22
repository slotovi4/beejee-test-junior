import * as React from "react";
import { cn } from "@bem-react/classname";

import logo from "./logo.svg";
import "./First.css";

class First extends React.Component {
  public render() {
    const first = cn("First");

    return (
      <div className={first()}>
        <header className={first("Header")}>
          <img src={logo} className={first("Logo")} alt="logo" />
          <h1 className={first("Title")}>Welcome to React</h1>
        </header>
        <p className={first("Intro")}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default First;
