import * as React from "react";
import { cn } from "@bem-react/classname";
import { connect } from "react-redux";
import { loginUser, exitUser } from "../../actions/headerActions";

// styles
import "./Header.css";

// interface
import { IUser } from "../../actions/interface";

interface IProps {
  admin: boolean;
  loginUser: (user: IUser) => void;
  exitUser: () => void;
}

class Header extends React.Component<IProps> {
  public state = {
    login: "",
    password: "",
    message: ""
  };

  public render() {
    const header = cn("Header");
    const { login, password, message } = this.state;
    const { admin } = this.props;

    return (
      <section className={header() + " container"}>
        {admin ? (
          <button onClick={this.props.exitUser}>Выйти</button>
        ) : (
          <React.Fragment>
            <span>{message}</span>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                required={true}
                placeholder="login"
                name="login"
                onChange={this.changeInput}
                value={login}
              />
              <input
                type="password"
                required={true}
                placeholder="password"
                name="password"
                onChange={this.changeInput}
                value={password}
              />
              <button className="btn btn-primary" type="submit">
                Войти
              </button>
            </form>
          </React.Fragment>
        )}
      </section>
    );
  }

  private changeInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };

  private onSubmit = (e: any) => {
    e.preventDefault();

    const { login, password } = this.state;

    this.props.loginUser({ login, password });

    const { admin } = this.props;
    this.setState({ message: admin ? "" : "неверный пользователь" });
  };
}

const mapStateToProps = (state: any) => ({
  admin: state.login.admin
});

export default connect(
  mapStateToProps,
  { loginUser, exitUser }
)(Header);
