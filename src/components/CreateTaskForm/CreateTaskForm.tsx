import * as React from "react";
import { cn } from "@bem-react/classname";

// style
import "./CreateTaskForm.css";

class CreateTaskForm extends React.Component {
  public render() {
    const form = cn("CreateTaskForm");

    return (
      <div className={form()}>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="username"
              required={true}
              pattern="[a-zA-Z]{1,}"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="email"
              required={true}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="text"
              required={true}
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            Создать
          </button>
        </form>
      </div>
    );
  }

  private onSubmit = (e: any) => {
    e.preventDefault();

    console.log(1);
  };
}

export default CreateTaskForm;
