import { Button, Modal } from "antd";
import styled from "styled-components";

interface Props {
    yesAction: () => void;
    noAction: () => void;
    title: string;
    visible: boolean;
}

const ActionBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledButton = styled(Button)`
    margin-right: 20px;
`;

const Title = styled.p`
    text-align: center;
    font-size: 20px;
    font-weight: 500;
`;

export const ConfirmModal = ({ visible, title, yesAction, noAction }: Props) => {
    return (
        <>
            <Modal onCancel={noAction} footer={null} visible={visible}>
                <Title>{title}</Title>
                <ActionBlock>
                    <StyledButton type="primary" onClick={yesAction}>
                        Yes
                    </StyledButton>
                    <Button onClick={noAction}>No</Button>
                </ActionBlock>
            </Modal>
        </>
    );
};
