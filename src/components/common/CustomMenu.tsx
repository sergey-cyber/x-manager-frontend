import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import style from "./CustomMenu.module.scss";

interface Item {
    label: string;
    key: string;
    onClick: () => void;
}

interface Props {
    items: Item[];
    trigger: ("click" | "hover" | "contextMenu")[];
}

export function CustomMenu({ items, trigger }: Props) {
    return (
        <Dropdown overlay={<Menu items={items} />} trigger={trigger}>
            <MenuOutlined className={style.menuIcon} />
        </Dropdown>
    );
}
