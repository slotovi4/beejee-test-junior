import * as React from "react";
import { connect } from "react-redux";
import {
  getPageTasks,
  getTasksCount,
  setPage,
  setSortField,
  setSortDirection,
  resetStoreTasks,
  changeTaskText,
  changeTaskStatus
} from "../../actions/mainPageActions";
import { Link } from "react-router-dom";
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
  admin: boolean;
  getTasksCount: () => void;
  getPageTasks: (page: number, config: ISortConfig) => void;
  setPage: (page: number) => void;
  setSortField: (field: "id" | "username" | "email" | "status") => void;
  setSortDirection: (direction: "asc" | "desc") => void;
  resetStoreTasks: () => void;
  changeTaskText: (id: number, text: string) => void;
  changeTaskStatus: (id: number, status: number) => void;
}

class MainPage extends React.Component<IProps> {
  public state = {
    load: false,
    pageTasks: [],
    nameClick: false,
    emailClick: false,
    statusClick: false,
    changedTaskId: null,
    changeText: false,
    changeStatus: false,
    changedText: "",
    changedStatus: ""
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

    // if change page
    if (page !== nextProps.page) {
      // get page tasks
      this.setState({ load: true });
      await this.props.getPageTasks(nextProps.page, nextProps.sortConfig);
      this.setState({ load: false });

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
      this.setState({ load: false });

      // get current page tasks
      this.getCurrentTasks(1);
    }
  }

  public render() {
    const { tasksCount, page, admin } = this.props;
    const {
      load,
      pageTasks,
      nameClick,
      emailClick,
      statusClick,
      changedTaskId,
      changeText,
      changeStatus
    } = this.state;
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
                  <th
                    className={main("Sort", { active: nameClick })}
                    onClick={() => {
                      this.sortByField("username");
                      this.setState({
                        nameClick: !nameClick,
                        emailClick: false,
                        statusClick: false
                      });
                    }}
                  >
                    Name
                  </th>
                  <th
                    className={main("Sort", { active: emailClick })}
                    onClick={() => {
                      this.sortByField("email");
                      this.setState({
                        emailClick: !emailClick,
                        nameClick: false,
                        statusClick: false
                      });
                    }}
                  >
                    Email
                  </th>
                  <th>Text</th>
                  <th
                    className={main("Sort", { active: statusClick })}
                    onClick={() => {
                      this.sortByField("status");
                      this.setState({
                        statusClick: !statusClick,
                        nameClick: false,
                        emailClick: false
                      });
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageTasks &&
                  pageTasks.map((task: ITask) => (
                    <tr
                      key={task.id}
                      className={main("Tr", {
                        ready: task.status === 10 ? true : false
                      })}
                    >
                      <td className={main("Td")}>{task.username}</td>
                      <td className={main("Td")}>{task.email}</td>
                      <td className={main("Td")}>
                        <div className={main("Change")}>
                          {admin ? (
                            <React.Fragment>
                              {changedTaskId === task.id && changeText ? (
                                <React.Fragment>
                                  <textarea
                                    className={main("Textarea")}
                                    defaultValue={task.text}
                                    onChange={e =>
                                      this.setState({
                                        changedText: e.target.value
                                      })
                                    }
                                  />
                                  <button
                                    className="btn btn-sm btn-default"
                                    onClick={() => this.changeText(task.id)}
                                  >
                                    Применить
                                  </button>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <span>{task.text}</span>
                                  <button
                                    className="btn btn-sm btn-default"
                                    onClick={() =>
                                      this.setState({
                                        changedTaskId: task.id,
                                        changeText: true
                                      })
                                    }
                                    disabled={changedTaskId ? true : false}
                                  >
                                    Редактировать
                                  </button>
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          ) : (
                            <span>{task.text}</span>
                          )}
                        </div>
                      </td>
                      <td className={main("Td")}>
                        <div className={main("Change")}>
                          {admin ? (
                            <React.Fragment>
                              {changedTaskId === task.id && changeStatus ? (
                                <React.Fragment>
                                  <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    defaultValue={task.status.toString()}
                                    onChange={e =>
                                      this.setState({
                                        changedStatus: e.target.value
                                      })
                                    }
                                  />
                                  <button
                                    className="btn btn-sm btn-default"
                                    onClick={() => this.changeStatus(task.id)}
                                  >
                                    Применить
                                  </button>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <span>{task.status}</span>
                                  <button
                                    className="btn btn-sm btn-default"
                                    onClick={() =>
                                      this.setState({
                                        changedTaskId: task.id,
                                        changeStatus: true
                                      })
                                    }
                                    disabled={changedTaskId ? true : false}
                                  >
                                    Редактировать
                                  </button>
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          ) : (
                            <span>{task.status}</span>
                          )}
                        </div>
                      </td>
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
            disabled={changedTaskId ? true : false}
          />
        ) : null}

        <Link to="/add" className="btn btn-primary">
          Создать задачу
        </Link>
      </section>
    );
  }

  // on change text
  private changeText = async (id: number) => {
    const { changedText } = this.state;
    const { page, sortConfig } = this.props;

    this.props.changeTaskText(id, changedText);
    this.setState({
      changedTaskId: null,
      changedText: "",
      changeText: false
    });
    this.setState({ load: true });
    await this.props.getPageTasks(page, sortConfig);
    this.setState({ load: false });
  };

  // on change status
  private changeStatus = async (id: number) => {
    const { changedStatus } = this.state;
    const { page, sortConfig } = this.props;

    this.props.changeTaskStatus(id, parseInt(changedStatus, 10));
    this.setState({
      changedTaskId: null,
      changedStatus: "",
      changeStatus: false
    });

    this.setState({ load: true });
    await this.props.getPageTasks(page, sortConfig);
    this.setState({ load: false });
  };

  // get current tasks
  private getCurrentTasks = (page: number) => {
    const { allTasks } = this.props;
    const length = allTasks.length;

    for (let i = 0; i < length; i++) {
      // set page tasks
      if (allTasks[i].page === page) {
        this.setState({ pageTasks: allTasks[i].tasks });
      }
    }
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
    }
  };
}

const mapStateToProps = (state: any) => ({
  allTasks: state.mainPage.allTasks,
  tasksCount: state.mainPage.tasksCount,
  page: state.mainPage.page,
  sortConfig: state.mainPage.sortConfig,
  admin: state.login.admin
});

export default connect(
  mapStateToProps,
  {
    getPageTasks,
    getTasksCount,
    setPage,
    setSortField,
    setSortDirection,
    resetStoreTasks,
    changeTaskText,
    changeTaskStatus
  }
)(MainPage);
