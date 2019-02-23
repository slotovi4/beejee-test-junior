import * as React from "react";
import { connect } from "react-redux";
import {
  getPageTasks,
  getTasksCount,
  setPage,
  setSortField,
  setSortDirection,
  resetStoreTasks
} from "../../actions/mainPageActions";
import { cn } from "@bem-react/classname";

// style
import "./MainPage.css";

// interface
import { ITask, IPageTasks, ISortConfig } from "../../actions/interface";

// components
import PageControll from "../PageControll/PageControll";

interface IProps {
  tasksCount: number;
  allTasks: IPageTasks[];
  page: number;
  sortConfig: ISortConfig;
  getTasksCount: () => void;
  getPageTasks: (page: number, config: ISortConfig) => void;
  setPage: (page: number) => void;
  setSortField: (field: "id" | "username" | "email" | "status") => void;
  setSortDirection: (direction: "asc" | "desc") => void;
  resetStoreTasks: () => void;
}

class MainPage extends React.Component<IProps> {
  public state = {
    load: false,
    loadPages: [],
    pageTasks: []
  };

  public async componentWillMount() {
    const { page, sortConfig } = this.props;

    // get tasks count
    await this.props.getTasksCount();
    // get page tasks
    this.setState({ load: true });
    await this.props.getPageTasks(1, sortConfig);
    this.setState({ load: false });
    // get current page tasks
    this.getCurrentTasks(page);
  }

  public async componentWillReceiveProps(nextProps: IProps) {
    const { page, sortConfig } = this.props;
    const loadPages: number[] = this.state.loadPages;

    if (page !== nextProps.page) {
      // if not loaded page
      if (loadPages.indexOf(nextProps.page) === -1) {
        // get page tasks
        this.setState({ load: true });
        await this.props.getPageTasks(nextProps.page, nextProps.sortConfig);
        this.setState({ load: false });
      }

      // get current page tasks
      this.getCurrentTasks(nextProps.page);
    }

    // if change config
    else if (
      sortConfig.field !== nextProps.sortConfig.field ||
      sortConfig.direction !== nextProps.sortConfig.direction
    ) {
      // reset store tasks
      this.props.resetStoreTasks();
      // set default page
      this.props.setPage(1);

      // get page tasks
      this.setState({ load: true });
      await this.props.getPageTasks(1, nextProps.sortConfig);
      this.setState({ load: false, loadPages: [1] });

      // get current page tasks
      this.getCurrentTasks(1);
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
                  <th onClick={() => this.sortByField("username")}>Name</th>
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
  private sortByField = async (
    field: "id" | "username" | "email" | "status"
  ) => {
    const { sortConfig } = this.props;

    // if change direction
    if (field === sortConfig.field) {
      const newDirection = sortConfig.direction === "asc" ? "desc" : "asc";
      this.props.setSortDirection(newDirection);
    } else {
      this.props.setSortField(field);

      // get page tasks
      // await this.props.getPageTasks(page, );
      // get current page tasks
      // this.getCurrentTasks(page);

      // await this.props.sortTasksByName(page);
      // делать запрос на получения фиелда с новым конфигом
      // ксли новый конфиг то делать ресет
    }
  };
}

const mapStateToProps = (state: any) => ({
  allTasks: state.mainPage.allTasks,
  tasksCount: state.mainPage.tasksCount,
  page: state.mainPage.page,
  sortConfig: state.mainPage.sortConfig
});

export default connect(
  mapStateToProps,
  {
    getPageTasks,
    getTasksCount,
    setPage,
    setSortField,
    setSortDirection,
    resetStoreTasks
  }
)(MainPage);
