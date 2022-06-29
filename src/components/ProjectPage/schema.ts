import { TaskStatuses, TaskTypes } from "../../custom_types/enums";

export type TaskFormData = {
    name: string;
    description: string;
    type: TaskTypes;
    status?: TaskStatuses;
};

export const initFormValues: TaskFormData = {
    name: "",
    description: "",
    type: TaskTypes.BUGFIX,
    status: TaskStatuses.TO_DO
};
