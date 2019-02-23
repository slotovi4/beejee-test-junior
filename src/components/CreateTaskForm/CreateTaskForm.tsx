import * as React from "react";
import { cn } from "@bem-react/classname";
import { connect } from "react-redux";
import { createTask } from "../../actions/createTaskFormActions";
import { setPage } from "../../actions/mainPageActions";

// style
import "./CreateTaskForm.css";

interface IProps {
  history: any;
  createTask: (task: FormData) => void;
  setPage: (page: number) => void;
}

class CreateTaskForm extends React.Component<IProps> {
  public state = {
    username: "",
    email: "",
    text: ""
  };

  public render() {
    const form = cn("CreateTaskForm");
    const { username, email, text } = this.state;

    return (
      <div className={form()}>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="username"
              name="username"
              required={true}
              pattern="[a-zA-Z]{1,}"
              onChange={this.changeInput}
              value={username}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="email"
              name="email"
              required={true}
              onChange={this.changeInput}
              value={email}
              pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="text"
              name="text"
              required={true}
              onChange={this.changeInput}
              value={text}
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            Создать
          </button>
        </form>
      </div>
    );
  }

  private changeInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };

  private onSubmit = async (e: any) => {
    e.preventDefault();

    const { username, email, text } = this.state;

    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("text", text);

    await this.props.createTask(form);

    this.props.setPage(1);

    this.props.history.push("/");
  };
}

export default connect(
  null,
  { createTask, setPage }
)(CreateTaskForm);
