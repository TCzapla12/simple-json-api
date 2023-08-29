import { useEffect, useState } from "react";

export default function SortSelect(props: sortSelectProps) {

    const [value, setValue] = useState("0");

    useEffect(() => {
        setValue((props.value));
    }, [props.value])

    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Sort by</span>
            </div>
            <select className="form-select"
                value={value} onChange={(e) => {
                    setValue(e.currentTarget.value);
                    props.onChange(e.currentTarget.value);
                }}>
                <option value="0">Default</option>
                <option value="alphabetic">Name: A to Z</option>
                <option value="ascending">Price: Low to High</option>
                <option value="descending">Price: High to Low</option>
            </select>
        </div>
    );
}

interface sortSelectProps {
    onChange(value: string): void;
    value: string;
}