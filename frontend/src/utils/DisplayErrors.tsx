export default function DisplayErrors(props: displayErrorsProps) {
    const style = { color: 'red' };

    return <>
        {props.error ? (
            <p style={style}>
                Error {props.error.status} : {props.error.title} <br />
                {props.error.detail}
            </p>
        ) : null}
    </>
}

interface displayErrorsProps {
    error?: error;
}

export interface error {
    status: string;
    title: string;
    detail: string;
}