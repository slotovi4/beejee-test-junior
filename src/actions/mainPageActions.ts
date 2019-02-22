import { GET_PAGE_TASKS, GET_TASKS_COUNT, SET_PAGE } from "./types";
import axios from "axios";
import { URL, DEV } from "../api/uxcandy";

export const getTasksCount = () => async (dispatch: any) => {
  const count = await axios.get(`${URL}?developer=${DEV}`);

  dispatch({
    type: GET_TASKS_COUNT,
    tasksCount: count.data.message.total_task_count
  });
};

export const getPageTasks = (page: number) => async (dispatch: any) => {
  const tasks = await axios.get(`${URL}?developer=${DEV}&page=${page}`);

  const pageTasks = {
    page,
    tasks: tasks.data.message.tasks
  };

  dispatch({
    type: GET_PAGE_TASKS,
    pageTasks
  });
};

export const setPage = (page: number) => (dispatch: any) => {
  dispatch({
    type: SET_PAGE,
    page
  });
};
