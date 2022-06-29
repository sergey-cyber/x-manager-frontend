import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import promise from "redux-promise-middleware";
import { projectsReducer } from "./reduser/projectsReducer";
import { tasksReducer } from "./reduser/tasksReduser";

const redusers = combineReducers({
    projectsState: projectsReducer,
    tasksData: tasksReducer
    /* form: formReducer  */ //redux-form Lesson 75
});

const store = createStore(redusers, applyMiddleware(promise, thunkMiddleware));

export type RootState = ReturnType<typeof store.getState>;

export default store;
