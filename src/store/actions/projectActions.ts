import { API } from "../../api/api";
import { ProjectActions } from "../reduser/projectsReducer";
import { CreateProjectRequest, UpdateProjectRequest } from "../../custom_types/types";

export function createProject(prData: CreateProjectRequest) {
    return {
        type: ProjectActions.CREATE_PROJECT,
        payload: API.project.create(prData)
    };
}

export function updateProject(prData: UpdateProjectRequest) {
    return {
        type: ProjectActions.UPDATE_PROJECT,
        payload: API.project.update(prData)
    };
}

export function getProjects() {
    return {
        type: ProjectActions.GET_PROJECTS,
        payload: API.project.getProjects()
    };
}
