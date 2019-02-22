import * as React from "react";
import { connect } from "react-redux";
import { getPageTasks } from "../../actions/mainPageActions";

// interface
import { ITask } from "../../actions/interface";

interface IProps {
  allTasks: any;
  getPageTasks: (page: number) => void;
}

class MainPage extends React.Component<IProps> {
  public state = {
    page: 0
  };

  public async componentWillMount() {
    await this.props.getPageTasks(1);
  }

  public render() {
    const { allTasks } = this.props;
    const { page } = this.state;

    return (
      <section className={"container"}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {allTasks[page] &&
              allTasks[page].map((task: ITask) => (
                <tr key={task.id}>
                  <td>{task.username}</td>
                  <td>{task.email}</td>
                  <td>{task.text}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  allTasks: state.mainPage.allTasks
});

export default connect(
  mapStateToProps,
  { getPageTasks }
)(MainPage);
