import { Col, Modal, Row } from "antd";

interface RowData {
    caption: string;
    value: string | Date | null;
}

interface Props {
    data: { rows: RowData[]; title: string } | undefined;
    visible: boolean;
    cancel: () => void;
}

export function InfoModal({ data, visible, cancel }: Props) {
    return (
        <Modal title={data?.title} visible={visible} footer={null} onCancel={() => cancel()}>
            {data?.rows &&
                data.rows.map((r) => (
                    <Row key={r.caption}>
                        <Col flex="auto">{r.caption}</Col>
                        <Col flex="auto">{r.value && r.value.toString()}</Col>
                    </Row>
                ))}
        </Modal>
    );
}
