import { Project } from "../../custom_types/types";

export enum ProjectActions {
    GET_PROJECTS = "projects/GET_PROJECTS",
    GET_PROJECTS_PENDING = "projects/GET_PROJECTS_PENDING",
    GET_PROJECTS_FULFILLED = "projects/GET_PROJECTS_FULFILLED",
    GET_PROJECTS_REJECTED = "projects/GET_PROJECTS_REJECTED",
    CREATE_PROJECT = "projects/CREATE_PROJECT",
    CREATE_PROJECT_FULFILLED = "projects/CREATE_PROJECT_FULFILLED",
    CREATE_PROJECT_PENDING = "projects/CREATE_PROJECT_PENDING",
    CREATE_PROJECT_REJECTED = "projects/CREATE_PROJECT_REJECTED",
    UPDATE_PROJECT = "projects/UPDATE_PROJECT",
    UPDATE_PROJECT_FULFILLED = "projects/UPDATE_PROJECT_FULFILLED",
    UPDATE_PROJECT_PENDING = "projects/UPDATE_PROJECT_PENDING",
    UPDATE_PROJECT_REJECTED = "projects/UPDATE_PROJECT_REJECTED"
}

type ActionType =
    | {
          type:
              | ProjectActions.GET_PROJECTS_PENDING
              | ProjectActions.GET_PROJECTS_REJECTED
              | ProjectActions.CREATE_PROJECT_PENDING
              | ProjectActions.CREATE_PROJECT_REJECTED
              | ProjectActions.UPDATE_PROJECT_PENDING
              | ProjectActions.UPDATE_PROJECT_REJECTED;
      }
    | {
          type: ProjectActions.GET_PROJECTS_FULFILLED;
          payload: Project[];
      }
    | {
          type: ProjectActions.CREATE_PROJECT_FULFILLED;
          payload: Project;
      }
    | {
          type: ProjectActions.UPDATE_PROJECT_FULFILLED;
          payload: Project;
      };

interface State {
    propjectLoading: boolean;
    newProjectCreating: boolean;
    projectUpdating: boolean;
    projects: Project[];
}

const initialState: State = {
    propjectLoading: false,
    newProjectCreating: false,
    projectUpdating: false,
    projects: []
};

export const projectsReducer = (state: State = initialState, action: ActionType): State => {
    switch (action.type) {
        case ProjectActions.GET_PROJECTS_PENDING: {
            return {
                ...state,
                propjectLoading: true
            };
        }
        case ProjectActions.GET_PROJECTS_FULFILLED: {
            return {
                ...state,
                propjectLoading: false,
                projects: action.payload
            };
        }
        case ProjectActions.GET_PROJECTS_REJECTED: {
            return {
                ...state,
                propjectLoading: false
            };
        }
        case ProjectActions.CREATE_PROJECT_PENDING: {
            return {
                ...state,
                newProjectCreating: true
            };
        }
        case ProjectActions.CREATE_PROJECT_FULFILLED: {
            const projects = [...state.projects, action.payload];
            return {
                ...state,
                projects,
                newProjectCreating: false
            };
        }
        case ProjectActions.CREATE_PROJECT_REJECTED: {
            return {
                ...state,
                newProjectCreating: false
            };
        }
        case ProjectActions.UPDATE_PROJECT_PENDING: {
            return {
                ...state,
                projectUpdating: true
            };
        }
        case ProjectActions.UPDATE_PROJECT_REJECTED: {
            return {
                ...state,
                projectUpdating: false
            };
        }
        case ProjectActions.UPDATE_PROJECT_FULFILLED: {
            const projects = state.projects.map((pr) => {
                if (pr.id === action.payload.id) {
                    return action.payload;
                }
                return pr;
            });
            return {
                ...state,
                projects,
                projectUpdating: false
            };
        }
        default:
            return state;
    }
};
