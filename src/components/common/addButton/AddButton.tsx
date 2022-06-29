import { PlusCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface Props {
    tooltip?: string;
    onClick: () => void;
    color?: string;
    size?: number;
}

export const AddButton = ({ onClick, tooltip, color, size }: Props) => {
    return (
        <Tooltip title={tooltip}>
            <PlusCircleOutlined style={{ color: color || "green", fontSize: size || 20 }} onClick={() => onClick()} />
        </Tooltip>
    );
};
