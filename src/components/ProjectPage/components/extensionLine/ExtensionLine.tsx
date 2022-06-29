import { Input, PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { AddButton } from "../../../common/addButton/AddButton";
import { CustomMenu } from "../../../common/CustomMenu";
import style from "./ExtensionLine.module.scss";

interface Props {
    title: string;
    createAction: () => void;
    filterFn: (value: string) => void;
}

export function ExtensionLine({ title, createAction, filterFn }: Props) {
    let navigate = useNavigate();

    return (
        <PageHeader
            className={style.header}
            onBack={() => navigate("/projects")}
            title={title}
            extra={[
                <AddButton key="1" size={30} onClick={() => createAction()} tooltip="Create new task" />,
                <Input key="2" placeholder="Filter..." onChange={(event) => filterFn(event.currentTarget.value)} />,
                <CustomMenu
                    key="3"
                    trigger={["click"]}
                    items={[
                        {
                            label: "Create new task",
                            key: "1",
                            onClick: () => console.log("Create new task")
                        },
                        {
                            label: "Tasks archive for this project",
                            key: "2",
                            onClick: () => console.log("Tasks archive for this project")
                        }
                    ]}
                />
            ]}
        />
    );
}
