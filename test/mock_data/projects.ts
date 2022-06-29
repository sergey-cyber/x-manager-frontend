import { Project, Task } from "../../src/custom_types/types";
import { v4 as uuid } from "uuid";
import { ProjectStatuses, TaskStatuses, TaskTypes } from "../../src/custom_types/enums";

const mockTasks: Task[] = [
    {
        id: uuid(),
        name: "Second_test_task",
        description: "Description for first task",
        created: new Date("13 May 2022"),
        updated: new Date("15 May 2022"),
        type: TaskTypes.STORY,
        status: TaskStatuses.IN_PROGRESS,
        refs: []
    },
    {
        id: uuid(),
        name: "Second_test_task",
        description: "Description for first task",
        created: new Date("14 May 2022"),
        updated: new Date("15 May 2022"),
        type: TaskTypes.STORY,
        status: TaskStatuses.IN_PROGRESS,
        refs: []
    }
];

export const mockProjects: Project[] = [
    {
        id: uuid(),
        name: "Jira_project",
        description: "A project to manage my tasks",
        created: new Date("12 May 2022"),
        updated: new Date("15 May 2022"),
        status: ProjectStatuses.IN_PROGRESS,
        ownerId: uuid(),
        tasks: mockTasks
    }
];
