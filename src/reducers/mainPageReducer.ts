import { GET_PAGE_TASKS, GET_TASKS_COUNT, SET_PAGE } from "../actions/types";

// interface
import { IPageTasks, ITask } from "../actions/interface";

interface IAction {
  type: "GET_PAGE_TASKS" | "GET_TASKS_COUNT" | "SET_PAGE";
  tasksCount?: string;
  pageTasks?: IPageTasks;
  page?: number;
}

interface IState {
  tasksCount: number;
  allTasks: ITask[];
  page: number;
}

const initialState: IState = {
  tasksCount: 0,
  allTasks: [],
  page: 1
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_TASKS_COUNT: {
      return {
        ...state,
        tasksCount: action.tasksCount ? parseInt(action.tasksCount, 10) : 0
      };
    }
    case GET_PAGE_TASKS:
      return {
        ...state,
        allTasks: action.pageTasks
          ? [...state.allTasks, action.pageTasks]
          : [...state.allTasks]
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};
