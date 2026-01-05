import { LangForm } from "@/services/projects";

export interface Employee {
  name: LangForm;
  position: LangForm;
  image: {
    url: string;
    fileId: string;
  };
  order: number;
  _id: string;
}

export interface GetEmployeesResponse {
  message: string;
  payload: Employee[];
}

export interface CreateEmployeeResponse {
  message: string;
  payload: Employee;
}
