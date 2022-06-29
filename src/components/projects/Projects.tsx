import { ProjectOutlined } from "@ant-design/icons";
import { Input, List, PageHeader } from "antd";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API } from "../../api/api";
import { owner_id } from "../../config/rest_api";
import { ProjectStatuses } from "../../custom_types/enums";
import { ProjectFormProps } from "../../custom_types/types";
import { useAsyncDispatch } from "../../hooks/useAsyncDispatch";
import { createProject, getProjects, updateProject } from "../../store/actions/projectActions";
import { RootState } from "../../store/store";
import { AddButton } from "../common/addButton/AddButton";
import { ConfirmModal } from "../common/confirm/ConfirmModal";
import { CustomMenu } from "../common/CustomMenu";
import { FormWrapper } from "../common/formWrapper/FormWrapper";
import { InfoModal } from "../common/infoModal/InfoModal";
import { Loader } from "../common/loader/Loader";
import { ProjectForm } from "./projectForm/ProjectForm";
import { ProjectFormData } from "./projectForm/schema";
import style from "./Projects.module.scss";

export function Projects() {
    const { enqueueSnackbar } = useSnackbar();
    const asyncDispatch = useAsyncDispatch();
    const projectsLoading = useSelector((state: RootState) => state.projectsState.propjectLoading);
    const projectCreating = useSelector((state: RootState) => state.projectsState.newProjectCreating);
    const projectUpdating = useSelector((state: RootState) => state.projectsState.projectUpdating);
    const projects = useSelector((state: RootState) => state.projectsState.projects);

    const [projectDelliting, setProjectDelliting] = useState(false);
    const [confirmProps, setConfirmProps] = useState<string | undefined>(undefined);

    const [infoModalProps, setInfoModalProps] = useState<
        { title: string; rows: { caption: string; value: string | Date | null }[] } | undefined
    >(undefined);
    const [filterValue, setFilterValue] = useState<string>("");
    const [formProps, setFormProps] = useState<ProjectFormProps | undefined>(undefined);

    const isSubmitting = useMemo(() => projectCreating || projectUpdating, [projectCreating, projectUpdating]);

    const getAllProjects = useCallback(() => {
        asyncDispatch(getProjects()).catch(() =>
            enqueueSnackbar("Ошибка при получении проектов", { variant: "error" })
        );
    }, [asyncDispatch, enqueueSnackbar]);

    useEffect(() => {
        getAllProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createNewProject = useCallback(
        (formData: ProjectFormData) => {
            asyncDispatch(
                createProject({ ...formData, created: new Date(), status: ProjectStatuses.TO_DO, ownerId: owner_id })
            )
                .then(() => {
                    setFormProps(undefined);
                    enqueueSnackbar("Проект создан успешно", { variant: "success" });
                })
                .catch(() => enqueueSnackbar("Ошибка при создании проекта", { variant: "error" }));
        },
        [asyncDispatch, enqueueSnackbar]
    );

    const deleteProject = useCallback(
        async (id: string) => {
            setProjectDelliting(true);
            try {
                const data = await API.project.delete(id);
                if (data.status === "OK") {
                    enqueueSnackbar("Проект удален успешно", { variant: "success" });
                    getAllProjects();
                } else {
                    enqueueSnackbar("Ошибка при удалении проекта", { variant: "error" });
                }
            } catch (error) {
                enqueueSnackbar("Ошибка при удалении проекта. Детали: " + error, { variant: "error" });
            } finally {
                setProjectDelliting(false);
            }
        },
        [enqueueSnackbar, getAllProjects]
    );

    const updateOneProject = useCallback(
        (formData: ProjectFormData, id: string) => {
            asyncDispatch(updateProject({ ...formData, id, updated: new Date() }))
                .then(() => {
                    setFormProps(undefined);
                    enqueueSnackbar("Проект обновлен успешно", { variant: "success" });
                })
                .catch(() => enqueueSnackbar("Ошибка при обновлении проекта", { variant: "error" }));
        },
        [asyncDispatch, enqueueSnackbar]
    );

    const onHandleSearch = useCallback((value: string) => {
        setFilterValue(value.toLowerCase());
    }, []);

    const filteredProjects = useMemo(() => {
        return projects?.filter(
            (p) => p.name.toLowerCase().includes(filterValue) || p.description?.toLowerCase().includes(filterValue)
        );
    }, [filterValue, projects]);

    if (projectsLoading || projectDelliting) {
        return <Loader size={24} minHeight={500} />;
    }

    return (
        <div className={style.projects}>
            <PageHeader
                className={style.header}
                title="Projects"
                subTitle="This is a subtitle"
                extra={[
                    <AddButton
                        key="1"
                        size={30}
                        onClick={() =>
                            setFormProps({
                                mode: "CREATE",
                                onSubmit: (data: ProjectFormData) => createNewProject(data)
                            })
                        }
                        tooltip="Create new project"
                    />,
                    <Input
                        key="2"
                        placeholder="Filter..."
                        onChange={(event) => onHandleSearch(event.currentTarget.value)}
                    />
                ]}
            />
            <List
                bordered
                itemLayout="horizontal"
                dataSource={filteredProjects}
                renderItem={(pr) => (
                    <List.Item
                        extra={
                            <CustomMenu
                                trigger={["click"]}
                                items={[
                                    {
                                        label: "Create new task",
                                        key: "1",
                                        onClick: () => console.log("Create new task ", pr.id)
                                    },
                                    {
                                        label: "Show info",
                                        key: "2",
                                        onClick: () => {
                                            const props = {
                                                rows: [
                                                    { caption: "Name:", value: pr.name },
                                                    { caption: "Created:", value: pr.created },
                                                    { caption: "Updated:", value: pr.updated },
                                                    { caption: "Description:", value: pr.description },
                                                    { caption: "Status:", value: pr.status }
                                                ],
                                                title: pr.name
                                            };
                                            setInfoModalProps(props);
                                        }
                                    },
                                    {
                                        label: "Delete",
                                        key: "3",
                                        onClick: () => setConfirmProps(pr.id)
                                    },
                                    {
                                        label: "Edit",
                                        key: "4",
                                        onClick: () => {
                                            const { description, name, status } = pr;
                                            setFormProps({
                                                mode: "UPDATE",
                                                defaultValues: { description, name, status },
                                                onSubmit: (data: ProjectFormData) => updateOneProject(data, pr.id)
                                            });
                                        }
                                    }
                                ]}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={pr.icon || <ProjectOutlined />}
                            title={
                                <Link to={`${pr.id}`} className={style.projectTitle}>
                                    {pr.name}
                                </Link>
                            }
                            description={pr.description}
                        />
                    </List.Item>
                )}
            />
            <InfoModal visible={!!infoModalProps} data={infoModalProps} cancel={() => setInfoModalProps(undefined)} />
            {formProps && (
                <FormWrapper onCancel={() => setFormProps(undefined)} footer={null} visible={!!formProps}>
                    <ProjectForm isSubmitting={isSubmitting} {...formProps} />
                </FormWrapper>
            )}

            <ConfirmModal
                title="Вы действительно хотите удалить проект?"
                yesAction={() => {
                    deleteProject(confirmProps!);
                    setConfirmProps(undefined);
                }}
                noAction={() => setConfirmProps(undefined)}
                visible={!!confirmProps}
            />
        </div>
    );
}
