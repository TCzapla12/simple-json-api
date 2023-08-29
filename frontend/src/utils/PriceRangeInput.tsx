import { useEffect, useState } from "react";

export default function PriceRangeInput(props: priceRangeInputProps) {
    const [valueMin, setValueMin] = useState(0);
    const [valueMax, setValueMax] = useState(0);

    useEffect(() => {
        setValueMin((props.priceMin));
        setValueMax((props.priceMax));
    }, [props.priceMin, props.priceMax])


    return <>
        <div className="col-auto">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">from</span>
                </div>
                <input style={{ maxWidth: '5rem' }} min="0" type="number" className="form-control" id="priceMin" value={valueMin}
                    onChange={(value) => {
                        setValueMin(parseInt(value.currentTarget.value))
                        props.onChangeMin(parseInt(value.currentTarget.value))
                    }} />
                <div className="input-group-append">
                    <span className="input-group-text">zł</span>
                </div>
            </div>
        </div>
        <div className="col-auto">
            -
        </div>
        <div className="col-auto">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">to</span>
                </div>
                <input style={{ maxWidth: '5rem' }} min={props.priceMin} type="number" className="form-control" id="priceMax" value={valueMax}
                    onChange={(value) => {
                        setValueMax(parseInt(value.currentTarget.value)); 
                        props.onChangeMax(parseInt(value.currentTarget.value));
                    }} />
                <div className="input-group-append">
                    <span className="input-group-text">zł</span>
                </div>
            </div>
        </div>
    </>
}

export interface priceRangeInputProps {
    priceMin: number;
    priceMax: number;
    onChangeMin(value: number): void;
    onChangeMax(value: number): void;
}