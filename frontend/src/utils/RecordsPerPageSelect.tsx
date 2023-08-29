export default function RecordsPerPageSelect(props: recordsPerPageSelectProps) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">Records</span>
            </div>
            <select
                className="form-select"
                defaultValue={10}
                onChange={(e) => {
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
}