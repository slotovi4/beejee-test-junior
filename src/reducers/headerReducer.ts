import { LOGIN, EXIT } from "../actions/types";

interface IAction {
  type: "LOGIN" | "EXIT";
  admin?: boolean;
}

interface IState {
  admin: boolean;
}

const initialState: IState = {
  admin: true
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        admin: action.admin
      };
    case EXIT:
      return {
        ...state,
        admin: false
      };
    default:
      return state;
  }
};
