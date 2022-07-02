import styled from "styled-components";
import { Task, TaskFormProps } from "../../../../custom_types/types";
import { CustomMenu } from "../../../common/CustomMenu";
import { Card, Tooltip, Typography } from "antd";
import { TaskIcon } from "../../../common/taskIcon/TaskIcon";
import { TaskFormData } from "../../schema";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { deleteTask, getTaskByProjectId, updateTask } from "../../../../store/actions/taskActions";
import { useAsyncDispatch } from "../../../../hooks/useAsyncDispatch";
import { useSnackbar } from "notistack";

const { Text } = Typography;

const StyledCard = styled(Card)`
    min-width: 300px;
    height: 200px;
    margin: 20px;
    border: solid 1px #cdcccc;
    & .ant-card-head {
        border-bottom: solid 1px #cdcccc;
    }
`;

const StyledText = styled(Text)`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
`;

interface Props {
    task: Task;
    projectId: string;
    setFormProps: (props: TaskFormProps | undefined) => void;
    setConfirmProps: (props: { action: () => void } | undefined) => void;
}

export const TaskCard = ({ task, projectId, setFormProps, setConfirmProps }: Props) => {
    const isTaskDeleting = useSelector((state: RootState) => state.tasksData.isTaskDeleting);
    const asyncDispatch = useAsyncDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const deleteOneTask = useCallback(
        (task_id: string) => {
            asyncDispatch(deleteTask(task_id)).then(() => {
                if (!projectId) {
                    return;
                }
                asyncDispatch(getTaskByProjectId(projectId))
                    .then(() => enqueueSnackbar("Задача удалена успешно", { variant: "success" }))
                    .catch(() => enqueueSnackbar("Ошибка при удалении задачи", { variant: "error" }));
            });
        },
        [asyncDispatch, enqueueSnackbar, projectId]
    );

    const editTask = useCallback(
        (formData: TaskFormData, id: string) => {
            asyncDispatch(updateTask({ ...formData, updated: new Date(), id }))
                .then(() => {
                    setFormProps(undefined);
                    enqueueSnackbar("Задача обновлена успешно", { variant: "success" });
                })
                .catch(() => enqueueSnackbar("Ошибка при обновлении задачи", { variant: "error" }));
        },
        [asyncDispatch, enqueueSnackbar, setFormProps]
    );

    return (
        <>
            <StyledCard
                key={task.id}
                loading={isTaskDeleting}
                title={
                    <Tooltip title={task.name}>
                        <TaskIcon ellipsis type={task.type} size={20} />
                        {task.name}
                    </Tooltip>
                }
                extra={
                    <CustomMenu
                        trigger={["click"]}
                        items={[
                            {
                                label: "Delete",
                                key: "1",
                                onClick: () => setConfirmProps({ action: () => deleteOneTask(task.id) })
                            },
                            {
                                label: "Edit",
                                key: "2",
                                onClick: () => {
                                    const { id, project_id, updated, created, ...defaultValues } = task;
                                    setFormProps({
                                        mode: "UPDATE",
                                        defaultValues,
                                        onSubmit: (data: TaskFormData) => editTask(data, task.id)
                                    });
                                }
                            }
                        ]}
                    />
                }
            >
                <StyledText>{task.description}</StyledText>
            </StyledCard>
        </>
    );
};
