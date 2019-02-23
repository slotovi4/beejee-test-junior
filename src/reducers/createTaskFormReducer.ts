import { CREATE_TASK } from "../actions/types";

// interface
import { ICreatedTask } from "../actions/interface";

interface IAction {
  type: "CREATE_TASK";
  newTask?: ICreatedTask;
}

interface IState {
  newTasks: ICreatedTask[];
}

const initialState: IState = {
  newTasks: []
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case CREATE_TASK:
      return state;
    default:
      return state;
  }
};
