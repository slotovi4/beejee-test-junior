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
import { ITask, IPageTasks } from "../../actions/interface";

// components
import PageControll from "../PageControll/PageControll";

interface IProps {
  tasksCount: number;
  allTasks: IPageTasks[];
  page: number;
  getTasksCount: () => void;
  getPageTasks: (page: number) => void;
  setPage: (page: number) => void;
}

class MainPage extends React.Component<IProps> {
  public state = {
    load: false,
    pageTasks: []
  };

  public async componentWillMount() {
    this.setState({ load: true });
    await this.props.getTasksCount();
    await this.props.getPageTasks(1);
    this.getCurrentTasks();
    this.setState({ load: false });
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    const { page } = this.props;

    if (page !== nextProps.page) {
      this.setState({ load: true });
      await this.props.getPageTasks(nextProps.page);
      this.getCurrentTasks();
      this.setState({ load: false });
    }
  }

  public render() {
    const { tasksCount } = this.props;
    const { load, pageTasks } = this.state;
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
                {pageTasks &&
                  pageTasks.map((task: ITask) => (
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

  private getCurrentTasks = () => {
    const { allTasks, page } = this.props;
    const length = allTasks.length;

    for (let i = 0; i < length; i++) {
      if (allTasks[i].page === page) {
        this.setState({ pageTasks: allTasks[i].tasks });
        break;
      }
    }
  };
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
