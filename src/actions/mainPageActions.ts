import {
  GET_PAGE_TASKS,
  GET_TASKS_COUNT,
  SET_PAGE,
  SET_SORT_FILED,
  SET_SORT_DIRECTION,
  RESET_STORE_TASKS
} from "./types";
import axios from "axios";
import { URL, DEV } from "../api/uxcandy";

// interface
import { ISortConfig } from "./interface";

export const getTasksCount = () => async (dispatch: any) => {
  const count = await axios.get(`${URL}?developer=${DEV}`);

  dispatch({
    type: GET_TASKS_COUNT,
    tasksCount: count.data.message.total_task_count
  });
};

export const getPageTasks = (page: number, config: ISortConfig) => async (
  dispatch: any
) => {
  const tasks = await axios.get(
    `${URL}?developer=${DEV}&page=${page}&sort_field=${
      config.field
    }&sort_direction=${config.direction}`
  );

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

// `${URL}?developer=${DEV}&sort_field=username&sort_direction=desc&page=${page}`

export const setSortField = (field: "id" | "username" | "email" | "status") => (
  dispanch: any
) => {
  dispanch({
    type: SET_SORT_FILED,
    field
  });
};

export const setSortDirection = (direction: "asc" | "desc") => (
  dispanch: any
) => {
  dispanch({
    type: SET_SORT_DIRECTION,
    direction
  });
};

export const resetStoreTasks = () => (dispatch: any) => {
  dispatch({
    type: RESET_STORE_TASKS
  });
};
