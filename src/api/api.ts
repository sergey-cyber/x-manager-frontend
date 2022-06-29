import * as axios from "axios";
import { rest_api } from "../config/rest_api";
import {
    CreateProjectRequest,
    CreateTaskRequest,
    Project,
    Task,
    UpdateProjectRequest,
    UpdateTaskRequest
} from "../custom_types/types";
import { DeleteProjectResponse } from "./types";

const { NODE_ENV } = process.env;

if (NODE_ENV === undefined) {
    throw new Error("Please set environment NODE_ENV");
}

const instance = axios.default.create({
    baseURL: rest_api[NODE_ENV]
});

export const API = {
    project: {
        getProjects: async () => {
            const { data } = await instance.get<Project[]>("project");
            return data;
        },
        create(prData: CreateProjectRequest): Promise<Project> {
            return instance.post("project", prData).then((res) => res.data);
        },
        delete: async (id: string) => {
            const { data } = await instance.delete<DeleteProjectResponse>(`project/${id}`);
            return data;
        },
        update: async (reqData: UpdateProjectRequest) => {
            const { data } = await instance.put("project", reqData);
            return data;
        }
    },
    task: {
        getByProjectId: (pr_id: string): Promise<Task[]> => {
            return instance.get(`task/${pr_id}`).then((res) => res.data);
        },
        create(taskData: CreateTaskRequest): Promise<Task> {
            return instance.post("task", taskData).then((res) => res.data);
        },
        delete(task_id: string) {
            return instance.delete(`task/${task_id}`).then((res) => res.data);
        },
        update(data: UpdateTaskRequest) {
            return instance.put("task", data).then((res) => res.data);
        }
    }
};
