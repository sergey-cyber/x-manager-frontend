import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import style from "./Loader.module.scss";

interface Props {
    size: number;
    minHeight?: number;
}

export function Loader({ size, minHeight }: Props) {
    return (
        <div className={style.container} style={{ minHeight }}>
            <Spin tip="Loading..." indicator={<LoadingOutlined style={{ fontSize: size }} spin />} />
        </div>
    );
}
