import { CREATE_TASK } from "./types";
import axios from "axios";
import { URL, DEV } from "../api/uxcandy";

export const createTask = (task: FormData) => async (dispatch: any) => {
  await axios.post(`${URL}create?developer=${DEV}`, task);

  dispatch({
    type: CREATE_TASK
  });
};
