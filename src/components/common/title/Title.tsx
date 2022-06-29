interface Props {
    text: string;
    fontSize?: number;
}

export function Title({ text, fontSize }: Props) {
    return <p style={{ fontSize: fontSize || 20, textAlign: "center" }}>{text}</p>;
}
