import * as React from "react";
import { connect } from "react-redux";
import { getPageTasks, getTasksCount } from "../../actions/mainPageActions";

// interface
import { ITask } from "../../actions/interface";

// components
import PageControll from "../PageControll/PageControll";

interface IProps {
  tasksCount: number;
  allTasks: any;
  getTasksCount: () => void;
  getPageTasks: (page: number) => void;
}

class MainPage extends React.Component<IProps> {
  public state = {
    page: 0
  };

  public async componentWillMount() {
    await this.props.getTasksCount();
    await this.props.getPageTasks(1);
  }

  public render() {
    const { allTasks, tasksCount } = this.props;
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

        {tasksCount > 0 ? (
          <PageControll
            itemsCount={tasksCount}
            pageItemsCount={3}
            defaultPage={1}
          />
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  allTasks: state.mainPage.allTasks,
  tasksCount: state.mainPage.tasksCount
});

export default connect(
  mapStateToProps,
  { getPageTasks, getTasksCount }
)(MainPage);
