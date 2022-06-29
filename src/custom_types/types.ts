import { TaskFormData } from "../components/ProjectPage/schema";
import { ProjectFormData } from "../components/projects/projectForm/schema";
import { ProjectStatuses, TaskStatuses, TaskTypes } from "./enums";

export interface Task {
    id: string;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    type: TaskTypes;
    status: TaskStatuses;
    project_id: string; //reference key
}

export interface Project {
    id: string;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    status: ProjectStatuses;
    ownerId?: string;
    icon?: string;
}

export type KeyValueSet = { [key: string]: string };

export interface RequestError {
    code: number;
    message: string;
    details: string | null;
}

export interface CreateProjectRequest {
    name: string;
    description?: string;
    created: Date;
    status: ProjectStatuses.TO_DO;
    ownerId: string;
    icon?: string;
}

export interface UpdateProjectRequest {
    id: string;
    name: string;
    description?: string;
    updated: Date;
    status?: ProjectStatuses;
}

export interface CreateTaskRequest {
    name: string;
    description?: string;
    created: Date;
    status: TaskStatuses.TO_DO;
    type: TaskTypes;
    project_id: string;
}

export interface UpdateTaskRequest {
    id: string;
    name: string;
    description?: string;
    updated: Date;
    status?: TaskStatuses;
    type: TaskTypes;
}

interface BaseFromProps {
    mode: "CREATE" | "UPDATE";
}

export interface TaskFormProps extends BaseFromProps {
    defaultValues?: Partial<TaskFormData>;
    onSubmit: (data: TaskFormData) => void;
}

export interface ProjectFormProps extends BaseFromProps {
    defaultValues?: Partial<ProjectFormData>;
    onSubmit: (data: ProjectFormData) => void;
}
