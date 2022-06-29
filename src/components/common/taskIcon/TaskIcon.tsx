import { BugOutlined, ContainerOutlined, RocketOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import styled from "styled-components";
import { TaskTypes } from "../../../custom_types/enums";
import style from "./TaskIcon.module.scss";

interface CaptionProps {
    ellipsis: boolean;
}

const Caption = styled.span<CaptionProps>`
    text-overflow: ${(props) => (props.ellipsis === true ? "clip" : "clip")};
`;

interface Props {
    type: TaskTypes;
    caption?: string;
    size?: number;
    ellipsis?: boolean;
}

export function TaskIcon({ type, caption, size = 20, ellipsis = false }: Props) {
    const baseStyle = useMemo(() => ({ fontSize: size }), [size]);
    let icon = useMemo(() => {
        switch (type) {
            case TaskTypes.BUGFIX:
                return <BugOutlined style={{ ...baseStyle, color: "red" }} />;
            case TaskTypes.TASK:
                return <RocketOutlined style={{ ...baseStyle, color: "green" }} />;
            default:
                return <ContainerOutlined />;
        }
    }, [baseStyle, type]);

    return (
        <>
            <span>{icon}</span>
            <Caption ellipsis={ellipsis} className={style.caption}>
                {caption}
            </Caption>
        </>
    );
}
