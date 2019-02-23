export interface ITask {
  id: number;
  username: string;
  email: string;
  text: string;
  status: number;
}

export interface ICreatedTask {
  username: string;
  email: string;
  text: string;
}

export interface IPageTasks {
  page: number;
  tasks: ITask[];
}

export interface ISortConfig {
  field: "id" | "username" | "email" | "status";
  direction: "asc" | "desc";
}
