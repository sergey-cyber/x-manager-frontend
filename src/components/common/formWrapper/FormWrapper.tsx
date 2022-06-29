import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { Modal } from "antd";

enum BaseFields {
    NAME = "name",
    DESCRIPTION = "description"
}

export const baseFormItems = [
    {
        name: BaseFields.NAME,
        caption: "Name",
        rules: {
            required: "Required field!"
        },
        control: <TextField fullWidth variant="outlined" label="Name" />
    },
    {
        name: BaseFields.DESCRIPTION,
        caption: "Description",
        rules: {
            required: "Required field!"
        },
        control: <TextField fullWidth variant="outlined" label="Description" />
    }
];

interface Props {
    onCancel: () => void;
    visible: boolean;
    footer: JSX.Element | null;
    children: JSX.Element;
}

const Container = styled.div`
    padding: 20px;
`;

export const FormWrapper = ({ onCancel, visible, footer, ...props }: Props) => {
    return (
        <Modal width={700} onCancel={onCancel} visible={visible} footer={footer}>
            <Container>{props.children}</Container>
        </Modal>
    );
};
