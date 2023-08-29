import { useEffect, useState } from "react";

export default function RecordsPerPageSelect(props: recordsPerPageSelectProps) {

    const [value, setValue] = useState(10);

    useEffect(() => {
        setValue((props.value));
    }, [props.value])

    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Records</span>
            </div>
            <select
                className="form-select"
                value={value}
                onChange={(e) => {
                    setValue(parseInt(e.currentTarget.value, 10));
                    props.onChange(parseInt(e.currentTarget.value, 10))
                }}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
}

interface recordsPerPageSelectProps {
    onChange(recordsPerPage: number): void;
    value: number;
}