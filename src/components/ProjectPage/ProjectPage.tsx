import { useParams } from "react-router-dom";
import style from "./ProjectPage.module.scss";
import { NotFoundPage } from "../notFoundPage/NotFoundPage";
import { ExtensionLine } from "./components/extensionLine/ExtensionLine";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RequestError, TaskFormProps } from "../../custom_types/types";
import { Loader } from "../common/loader/Loader";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAsyncDispatch } from "../../hooks/useAsyncDispatch";
import { createTask, getTaskByProjectId } from "../../store/actions/taskActions";
import { NoData } from "../common/noData/NoData";
import { TaskForm } from "./components/formContainer/FormContainer";
import { FormWrapper } from "../common/formWrapper/FormWrapper";
import { TaskStatuses, TaskTypes } from "../../custom_types/enums";
import { TaskFormData } from "./schema";
import { useSnackbar } from "notistack";
import { TasksTable } from "./components/table/TasksTable";
import { ConfirmModal } from "../common/confirm/ConfirmModal";

export function ProjectPage() {
    const { projectId } = useParams();

    const { enqueueSnackbar } = useSnackbar();
    const asyncDispatch = useAsyncDispatch();
    const tasks = useSelector((state: RootState) => state.tasksData.tasks);
    const tasksLoading = useSelector((state: RootState) => state.tasksData.tasksLoading);
    const isTaskCreating = useSelector((state: RootState) => state.tasksData.isTaskCreating);
    const isTaskUpdating = useSelector((state: RootState) => state.tasksData.isTaskUpdating);
    const projects = useSelector((state: RootState) => state.projectsState.projects);
    const [requestError, setRequestError] = useState<AxiosError<RequestError> | undefined>(undefined);
    const [formProps, setFormProps] = useState<TaskFormProps | undefined>(undefined);

    const [filterValue, setFilterValue] = useState("");
    const [confirmProps, setConfirmProps] = useState<{ action: () => void } | undefined>(undefined);

    const curentProject = useMemo(() => {
        return projects.find((pr) => pr.id === projectId);
    }, [projects, projectId]);

    const isSubmitting = useMemo(() => isTaskCreating || isTaskUpdating, [isTaskCreating, isTaskUpdating]);

    useEffect(() => {
        asyncDispatch(getTaskByProjectId(projectId || "")).catch((error) => setRequestError(error));
    }, [asyncDispatch, projectId]);

    const filterTasks = useCallback((value: string) => {
        setFilterValue(value);
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter((t) => t.name.includes(filterValue));
    }, [filterValue, tasks]);

    const createNewTask = useCallback(
        (formData: TaskFormData) => {
            asyncDispatch(
                createTask({
                    ...formData,
                    status: TaskStatuses.TO_DO,
                    created: new Date(),
                    project_id: projectId || ""
                })
            )
                .then(() => {
                    setFormProps(undefined);
                    enqueueSnackbar("Задача создана успешно", { variant: "success" });
                })
                .catch(() => enqueueSnackbar("Ошибка при создании задачи", { variant: "error" }));
        },
        [asyncDispatch, enqueueSnackbar, projectId]
    );

    if (tasksLoading) {
        return <Loader size={24} minHeight={500} />;
    }

    if (requestError) {
        return requestError.response?.data?.code === 404 ? (
            <NotFoundPage message={requestError.response.data.message} redirect="/projects" />
        ) : (
            <h1>Что - то пошло не так, попробуйте еще раз</h1>
        );
    }

    return (
        <div className={style.projectPage}>
            <ExtensionLine
                filterFn={(value: string) => filterTasks(value)}
                createAction={() =>
                    setFormProps({
                        mode: "CREATE",
                        onSubmit: (data: TaskFormData) => createNewTask(data),
                        defaultValues: { type: TaskTypes.BUGFIX }
                    })
                }
                title={curentProject?.name || ""}
            />
            {tasks.length < 1 ? (
                <NoData action={() => ""} />
            ) : (
                <TasksTable
                    setConfirmProps={setConfirmProps}
                    tasks={filteredTasks}
                    projectId={projectId || ""}
                    setFormProps={setFormProps}
                />
            )}
            {formProps && (
                <FormWrapper onCancel={() => setFormProps(undefined)} footer={null} visible={!!formProps}>
                    <TaskForm isSubmitting={isSubmitting} {...formProps} />
                </FormWrapper>
            )}
            {confirmProps && (
                <ConfirmModal
                    yesAction={() => {
                        confirmProps!.action();
                        setConfirmProps(undefined);
                    }}
                    noAction={() => setConfirmProps(undefined)}
                    visible={!!confirmProps}
                    title={"Вы действительно хотите удалить задачу?"}
                />
            )}
        </div>
    );
}
