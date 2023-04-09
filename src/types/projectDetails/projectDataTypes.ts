import React from 'react';

export type admin = {
  readonly userId: number;
  name: string;
  email: string;
  type: string;
}[];

export type task = {
  readonly id: number;
  title: string;
  status: number;
  assignedEmpIds: number[];
};

export type projectList = {
  readonly id: number;
  pName?: string;
  description?: string;
  estimatedHours?: number;
  currentWorkedHours?: number;
  cId?: number;
  startDate?: string;
  endDate?: string;
  tasks?: task[];
}[];

export interface DataContextType {
  admins: admin;
  setAdmins: React.Dispatch<React.SetStateAction<admin | null>>;
  projects: projectList;
  setProjects: React.Dispatch<React.SetStateAction<projectList | null>>;
}

export enum Status {
  // eslint-disable-next-line no-unused-vars
  TO_DO = -1,
  // eslint-disable-next-line no-unused-vars
  IN_PROGRESS = 0,
  // eslint-disable-next-line no-unused-vars
  DONE = 1,
}
