import * as React from "react";
import { cn } from "@bem-react/classname";

// styles
import "./Header.css";

class Header extends React.Component {
  public render() {
    const header = cn("Header");

    return (
      <section className={header() + " container"}>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="login" />
          <input type="password" placeholder="password" />
          <button className="btn btn-primary" type="submit">
            Войти
          </button>
        </form>
      </section>
    );
  }

  private onSubmit = (e: any) => {
    e.preventDefault();

    console.log(1);
  };
}

export default Header;
