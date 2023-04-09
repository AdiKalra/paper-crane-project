// import { task } from "./adminDataTypes";

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  status: string;
  client: string;
  dueDate: string;
  repository: string;
}

export interface TaskRowItem {
  id: number;
  task: string;
  status: number;
  assigned: string;
  openTaskItemModal: () => void;
  closeTaskItemModal: () => void;
}