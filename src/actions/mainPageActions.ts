import { GET_PAGE_TASKS } from "./types";
import axios from "axios";
import { URL, DEV } from "../api/uxcandy";

export const getPageTasks = (page: number) => async (dispatch: any) => {
  const tasks = await axios.get(`${URL}?developer=${DEV}&page=${page}`);

  dispatch({
    type: GET_PAGE_TASKS,
    pageTasks: tasks.data.message.tasks
  });
};
