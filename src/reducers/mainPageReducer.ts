import { GET_PAGE_TASKS } from "../actions/types";

// interface
import { ITask } from "../actions/interface";

interface IAction {
  type: "GET_PAGE_TASKS";
  pageTasks?: ITask[];
}

interface IState {
  allTasks: ITask[];
}

const initialState: IState = {
  allTasks: []
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_PAGE_TASKS:
      return {
        ...state,
        allTasks: [...state.allTasks, action.pageTasks]
      };
    default:
      return state;
  }
};
