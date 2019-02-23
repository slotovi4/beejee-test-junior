import {
  GET_PAGE_TASKS,
  GET_TASKS_COUNT,
  SET_PAGE,
  SET_SORT_FILED,
  SET_SORT_DIRECTION,
  RESET_STORE_TASKS,
  CHANGE_TASK_TEXT
} from "./types";
import axios from "axios";
import * as md5 from "md5";
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

export const changeTaskText = (id: number, text: string) => async (
  dispatch: any
) => {
  if (text !== "" && text) {
    const paramsString = fixedEncodeURIComponent(
      `status=0&text=SomeText&token=beejee`
    );
    const signature = md5(paramsString);

    console.log(paramsString);
    console.log(signature);

    const form = new FormData();
    form.append("status", "0");
    form.append("text", "SomeText");
    form.append("token", "beejee");
    form.append("params_string", paramsString);
    form.append("signature", signature);

    const count = await axios.post(`${URL}edit/${id}?developer=${DEV}`, form);

    console.log(count.data);
  }

  dispatch({
    type: CHANGE_TASK_TEXT
  });
};

const fixedEncodeURIComponent = (str: string) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => {
    return "%" + c.charCodeAt(0).toString(16);
  });
};
