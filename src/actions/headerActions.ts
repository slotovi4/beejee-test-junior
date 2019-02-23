import { LOGIN, EXIT } from "./types";

// iterfase
import { IUser } from "./interface";

export const loginUser = (user: IUser) => (dispatch: any) => {
  dispatch({
    type: LOGIN,
    admin: user.login === "admin" && user.password === "123" ? true : false
  });
};

export const exitUser = () => (dispatch: any) => {
  dispatch({
    type: EXIT
  });
};
