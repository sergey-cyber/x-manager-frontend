import { Grid } from "@mui/material";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { TaskStatuses } from "../../../../custom_types/enums";
import { Task, TaskFormProps } from "../../../../custom_types/types";
import { app_header_height, extension_line_height } from "../../../../styles/constants";
import { TaskCard } from "../card/TaskCard";

const Container = styled.div`
    width: 100%;
    height: calc(100vh - ${app_header_height} - ${extension_line_height});
    display: flex;
    flex-direction: column;
`;

const TableHeader = styled(Grid)`
    padding: 10px 0;
    text-align: center;
    font-weight: 500;
    background-color: #dbdeb9;
    border-bottom: solid 1px #9e8e8a;
`;

const OverflowContainer = styled(Grid)`
    overflow-y: scroll;
    height: 100%;
`;

const WithBorder = styled(Grid)`
    border-left: dashed 2px #ded4d1;
    border-right: dashed 2px #ded4d1;
`;

const EmptyList = styled.p`
    font-size: 16px;
    text-align: center;
    font-style: italic;
    margin-top: 20px;
    color: #999;
`;

interface Props {
    tasks: Task[];
    projectId: string;
    setFormProps: (props: TaskFormProps | undefined) => void;
    setConfirmProps: (props: { action: () => void } | undefined) => void;
}

export const TasksTable = ({ tasks, projectId, setFormProps, setConfirmProps }: Props) => {
    const toDo = useMemo(() => tasks.filter((t) => t.status === TaskStatuses.TO_DO), [tasks]);
    const inProgress = useMemo(() => tasks.filter((t) => t.status === TaskStatuses.IN_PROGRESS), [tasks]);
    const resolved = useMemo(
        () => tasks.filter((t) => t.status === TaskStatuses.RESOLVED || t.status === TaskStatuses.CLOSED),
        [tasks]
    );

    const maper = useCallback(
        (tasks: Task[]) => {
            if (tasks.length < 1) {
                return <EmptyList>Empty list</EmptyList>;
            }
            return (
                <>
                    {tasks.map((t) => (
                        <TaskCard
                            key={t.id}
                            setConfirmProps={setConfirmProps}
                            task={t}
                            projectId={projectId}
                            setFormProps={setFormProps}
                        />
                    ))}
                </>
            );
        },
        [projectId, setConfirmProps, setFormProps]
    );

    return (
        <Container>
            <TableHeader container>
                <Grid item xs={4}>
                    TO DO
                </Grid>
                <Grid item xs={4}>
                    In progress
                </Grid>
                <Grid item xs={4}>
                    Resolved(Closed)
                </Grid>
            </TableHeader>
            <OverflowContainer container>
                <Grid item xs={4}>
                    {maper(toDo)}
                </Grid>
                <WithBorder item xs={4}>
                    {maper(inProgress)}
                </WithBorder>
                <Grid item xs={4}>
                    {maper(resolved)}
                </Grid>
            </OverflowContainer>
        </Container>
    );
};
