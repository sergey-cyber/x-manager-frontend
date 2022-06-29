import { Button, Empty } from "antd";
import style from "./NoData.module.scss";

interface Props {
    action?: () => void;
}

export const NoData = ({ action }: Props) => (
    <Empty
        className={style.noData}
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
            height: 60
        }}
        description={<span>There are no tasks yet</span>}
    >
        {action && (
            <Button onClick={() => action()} type="primary">
                Create Now
            </Button>
        )}
    </Empty>
);
