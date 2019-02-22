import * as React from "react";
import { connect } from "react-redux";
import {
  getPageTasks,
  getTasksCount,
  setPage,
  setSortField
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
  setSortField: (field: "id" | "username" | "email" | "status") => void;
}

class MainPage extends React.Component<IProps> {
  public state = {
    load: false,
    loadPages: [],
    pageTasks: []
  };

  public async componentWillMount() {
    const { page } = this.props;

    this.setState({ load: true });

    // get tasks count
    await this.props.getTasksCount();
    // get page tasks
    await this.props.getPageTasks(1);
    // get current page tasks
    this.getCurrentTasks(page);

    this.setState({ load: false });
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    const { page } = this.props;
    const loadPages: number[] = this.state.loadPages;

    if (page !== nextProps.page) {
      // if not loaded page
      if (loadPages.indexOf(nextProps.page) === -1) {
        this.setState({ load: true });

        // get page tasks
        await this.props.getPageTasks(nextProps.page);

        this.setState({ load: false });
      }

      // get current page tasks
      this.getCurrentTasks(nextProps.page);
    }
  }

  public render() {
    const { tasksCount, page } = this.props;
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
                  <th onClick={() => this.sortByName("username")}>Name</th>
                  <th>Email</th>
                  <th>Text</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pageTasks &&
                  pageTasks.map((task: ITask) => (
                    <tr key={task.id}>
                      <td>{task.username}</td>
                      <td>{task.email}</td>
                      <td>{task.text}</td>
                      <td>{task.status}</td>
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
            currentPage={page}
          />
        ) : null}
      </section>
    );
  }

  // get current tasks
  private getCurrentTasks = (page: number) => {
    const { allTasks } = this.props;
    const length = allTasks.length;
    const loadPages = [];

    for (let i = 0; i < length; i++) {
      // set page tasks
      if (allTasks[i].page === page) {
        this.setState({ pageTasks: allTasks[i].tasks });
      }

      // put loaded pages
      loadPages.push(allTasks[i].page);
    }

    // set loaded pages
    this.setState({ loadPages });
  };

  // sort all tasks
  private sortByName = async (
    field: "id" | "username" | "email" | "status"
  ) => {
    const { page } = this.props;

    if (field === "username") {
      this.props.setSortField("username");
      // await this.props.sortTasksByName(page);
      // делать запрос на получения фиелда с новым конфигом
      // ксли новый конфиг то делать ресет
    }

    // reset state
    this.setState({
      loadPages: [page],
      pageTasks: this.props.allTasks[0].tasks
    });
  };
}

const mapStateToProps = (state: any) => ({
  allTasks: state.mainPage.allTasks,
  tasksCount: state.mainPage.tasksCount,
  page: state.mainPage.page
});

export default connect(
  mapStateToProps,
  { getPageTasks, getTasksCount, setPage, setSortField }
)(MainPage);
