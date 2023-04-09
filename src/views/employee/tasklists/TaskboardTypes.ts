export interface TaskboardItem {
  id: string;
  title: string;
  description: string;
  assignedEmpIds: number[];
}

export enum TaskboardItemStatus {
  // eslint-disable-next-line no-unused-vars
  TO_DO = 'To Do',
  // eslint-disable-next-line no-unused-vars
  IN_PROGRESS = 'In Progress',
  // eslint-disable-next-line no-unused-vars
  DONE = 'Done',
}
