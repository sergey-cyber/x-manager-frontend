import { Button, Result } from "antd";
import { Link } from "react-router-dom";

interface Props {
    message: string;
    redirect: string;
}

export function NotFoundPage({ message, redirect }: Props) {
    return (
        <Result
            status="404"
            title="404"
            subTitle={message}
            extra={
                <Link to={redirect}>
                    <Button type="primary">Back Home</Button>
                </Link>
            }
        />
    );
}
