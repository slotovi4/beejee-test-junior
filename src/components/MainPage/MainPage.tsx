import * as React from "react";
import { connect } from "react-redux";
import {
  getPageTasks,
  getTasksCount,
  setPage
} from "../../actions/mainPageActions";
import { cn } from "@bem-react/classname";

// style
import "./MainPage.css";

// interface
import { ITask } from "../../actions/interface";

// components
import PageControll from "../PageControll/PageControll";

interface IProps {
  tasksCount: number;
  allTasks: any;
  page: number;
  getTasksCount: () => void;
  getPageTasks: (page: number) => void;
  setPage: (page: number) => void;
}

class MainPage extends React.Component<IProps> {
  public state = {
    load: false
  };

  public async componentWillMount() {
    this.setState({ load: true });
    await this.props.getTasksCount();
    await this.props.getPageTasks(1);
    this.setState({ load: false });
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    const { page } = this.props;

    if (page !== nextProps.page) {
      this.setState({ load: true });
      await this.props.getPageTasks(nextProps.page);
      this.setState({ load: false });
    }
  }

  public render() {
    const { allTasks, tasksCount, page } = this.props;
    const { load } = this.state;
    const main = cn("MainPage");

    return (
      <section className={"container"}>
        <div className={main("Content")}>
          {load ? (
            <span>загрузка...</span>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {allTasks[page - 1] &&
                  allTasks[page - 1].map((task: ITask) => (
                    <tr key={task.id}>
                      <td>{task.username}</td>
                      <td>{task.email}</td>
                      <td>{task.text}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {tasksCount > 0 ? (
          <PageControll
            itemsCount={tasksCount}
            pageItemsCount={3}
            defaultPage={1}
            nextPage={this.props.setPage}
          />
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  allTasks: state.mainPage.allTasks,
  tasksCount: state.mainPage.tasksCount,
  page: state.mainPage.page
});

export default connect(
  mapStateToProps,
  { getPageTasks, getTasksCount, setPage }
)(MainPage);
