export interface ITask {
  id: number;
  username: string;
  email: string;
  text: string;
  status: number;
}

export interface IPageTasks {
  page: number;
  tasks: ITask[];
}
