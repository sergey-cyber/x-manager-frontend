import { Task } from "../../custom_types/types";

export enum TaskActions {
    // Async
    GET_TASK_BY_PROJECT_ID = "task-reducer/GET_TASK_BY_PROJECT_ID",
    GET_TASK_BY_PROJECT_ID_PENDING = "task-reducer/GET_TASK_BY_PROJECT_ID_PENDING",
    GET_TASK_BY_PROJECT_ID_FULFILLED = "task-reducer/GET_TASK_BY_PROJECT_ID_FULFILLED",
    GET_TASK_BY_PROJECT_ID_REJECTED = "task-reducer/GET_TASK_BY_PROJECT_ID_REJECTED",

    CREATE_TASK = "task-reducer/CREATE_TASK",
    CREATE_TASK_PENDING = "task-reducer/CREATE_TASK_PENDING",
    CREATE_TASK_FULFILLED = "task-reducer/CREATE_TASK_FULFILLED",
    CREATE_TASK_REJECTED = "task-reducer/CREATE_TASK_REJECTED",

    DELETE_TASK = "task-reducer/DELETE_TASK",
    DELETE_TASK_PENDING = "task-reducer/DELETE_TASK_PENDING",
    DELETE_TASK_FULFILLED = "task-reducer/DELETE_TASK_FULFILLED",
    DELETE_TASK_REJECTED = "task-reducer/DELETE_TASK_REJECTED",

    UPDATE_TASK = "task-reducer/UPDATE_TASK",
    UPDATE_TASK_PENDING = "task-reducer/UPDATE_TASK_PENDING",
    UPDATE_TASK_FULFILLED = "task-reducer/UPDATE_TASK_FULFILLED",
    UPDATE_TASK_REJECTED = "task-reducer/UPDATE_TASK_REJECTED"
}

type ActionType =
    | {
          type:
              | TaskActions.GET_TASK_BY_PROJECT_ID_PENDING
              | TaskActions.GET_TASK_BY_PROJECT_ID_REJECTED
              | TaskActions.CREATE_TASK_PENDING
              | TaskActions.CREATE_TASK_REJECTED
              | TaskActions.DELETE_TASK_PENDING
              | TaskActions.DELETE_TASK_REJECTED
              | TaskActions.DELETE_TASK_FULFILLED
              | TaskActions.UPDATE_TASK_PENDING
              | TaskActions.UPDATE_TASK_REJECTED;
      }
    | {
          type: TaskActions.GET_TASK_BY_PROJECT_ID_FULFILLED;
          payload: Task[];
      }
    | {
          type: TaskActions.CREATE_TASK_FULFILLED;
          payload: Task;
      }
    | {
          type: TaskActions.UPDATE_TASK_FULFILLED;
          payload: Task;
      };

interface State {
    tasksLoading: boolean;
    isTaskCreating: boolean;
    isTaskDeleting: boolean;
    isTaskUpdating: boolean;
    tasks: Task[];
}

const initialState: State = {
    tasksLoading: false,
    isTaskCreating: false,
    isTaskDeleting: false,
    isTaskUpdating: false,
    tasks: []
};

export const tasksReducer = (state: State = initialState, action: ActionType): State => {
    switch (action.type) {
        case TaskActions.GET_TASK_BY_PROJECT_ID_PENDING: {
            return {
                ...state,
                tasksLoading: true
            };
        }
        case TaskActions.GET_TASK_BY_PROJECT_ID_FULFILLED: {
            return {
                ...state,
                tasksLoading: false,
                tasks: action.payload
            };
        }
        case TaskActions.GET_TASK_BY_PROJECT_ID_REJECTED: {
            return {
                ...state,
                tasksLoading: false
            };
        }
        case TaskActions.CREATE_TASK_PENDING: {
            return {
                ...state,
                isTaskCreating: true
            };
        }
        case TaskActions.CREATE_TASK_FULFILLED: {
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                isTaskCreating: false
            };
        }
        case TaskActions.CREATE_TASK_REJECTED: {
            return {
                ...state,
                isTaskCreating: false
            };
        }
        case TaskActions.DELETE_TASK_PENDING: {
            return {
                ...state,
                isTaskDeleting: true
            };
        }
        case TaskActions.DELETE_TASK_FULFILLED:
        case TaskActions.DELETE_TASK_REJECTED: {
            return {
                ...state,
                isTaskDeleting: false
            };
        }
        case TaskActions.UPDATE_TASK_PENDING: {
            return {
                ...state,
                isTaskUpdating: true
            };
        }
        case TaskActions.UPDATE_TASK_FULFILLED: {
            const tasks = state.tasks.map((t) => {
                if (t.id === action.payload.id) {
                    return action.payload;
                }
                return t;
            });
            return {
                ...state,
                isTaskUpdating: false,
                tasks
            };
        }
        case TaskActions.UPDATE_TASK_REJECTED: {
            return {
                ...state,
                isTaskUpdating: false
            };
        }
        default:
            return state;
    }
};
