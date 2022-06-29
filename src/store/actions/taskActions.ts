import { API } from "../../api/api";
import { CreateTaskRequest, UpdateTaskRequest } from "../../custom_types/types";
import { TaskActions } from "../reduser/tasksReduser";

export function getTaskByProjectId(id: string) {
    return {
        type: TaskActions.GET_TASK_BY_PROJECT_ID,
        payload: API.task.getByProjectId(id)
    };
}

export function createTask(taskData: CreateTaskRequest) {
    return {
        type: TaskActions.CREATE_TASK,
        payload: API.task.create(taskData)
    };
}

export function deleteTask(task_id: string) {
    return {
        type: TaskActions.DELETE_TASK,
        payload: API.task.delete(task_id)
    };
}

export function updateTask(data: UpdateTaskRequest) {
    return {
        type: TaskActions.UPDATE_TASK,
        payload: API.task.update(data)
    };
}
