import { GET_PAGE_TASKS, GET_TASKS_COUNT } from "../actions/types";

// interface
import { ITask } from "../actions/interface";

interface IAction {
  type: "GET_PAGE_TASKS" | "GET_TASKS_COUNT";
  tasksCount?: number;
  pageTasks?: ITask[];
}

interface IState {
  tasksCount: number;
  allTasks: ITask[];
}

const initialState: IState = {
  tasksCount: 0,
  allTasks: []
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_TASKS_COUNT: {
      return {
        ...state,
        tasksCount: action.tasksCount
      };
    }
    case GET_PAGE_TASKS:
      return {
        ...state,
        allTasks: [...state.allTasks, action.pageTasks]
      };
    default:
      return state;
  }
};
