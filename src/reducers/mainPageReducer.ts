import {
  GET_PAGE_TASKS,
  GET_TASKS_COUNT,
  SET_PAGE,
  SET_SORT_FILED,
  SET_SORT_DIRECTION,
  RESET_STORE_TASKS,
  CHANGE_TASK_TEXT,
  CHANGE_TASK_STATUS
} from "../actions/types";

// interface
import { IPageTasks, ISortConfig } from "../actions/interface";

interface IAction {
  type:
    | "GET_PAGE_TASKS"
    | "GET_TASKS_COUNT"
    | "SET_PAGE"
    | "SET_SORT_FILED"
    | "SET_SORT_DIRECTION"
    | "RESET_STORE_TASKS"
    | "CHANGE_TASK_TEXT"
    | "CHANGE_TASK_STATUS";
  tasksCount?: string;
  pageTasks?: IPageTasks;
  sortedByName?: IPageTasks;
  page?: number;
  field?: string;
  direction?: string;
  change?: boolean;
}

interface IState {
  tasksCount: number;
  allTasks: IPageTasks[];
  page: number;
  sortConfig: ISortConfig;
  change: boolean;
}

const initialState: IState = {
  tasksCount: 0,
  allTasks: [],
  page: 1,
  sortConfig: {
    field: "id",
    direction: "asc"
  },
  change: false
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
    case SET_SORT_FILED:
      return {
        ...state,
        sortConfig: {
          field: action.field,
          direction: state.sortConfig.direction
        }
      };
    case SET_SORT_DIRECTION:
      return {
        ...state,
        sortConfig: {
          direction: action.direction,
          field: state.sortConfig.field
        }
      };
    case RESET_STORE_TASKS:
      return {
        ...state,
        allTasks: []
      };
    case CHANGE_TASK_TEXT:
      return {
        ...state,
        change: action.change
      };
    case CHANGE_TASK_STATUS:
      return {
        ...state,
        change: action.change
      };
    default:
      return state;
  }
};
