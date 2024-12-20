import { useMemo } from "react";
import { BaseChart } from "./BaseChart"

export type ChartProps = {
    data: number[];
};

export function Chart(props: ChartProps){
    const preparedData = useMemo(() => props.data.map(
        point => ({value: point * 100})
    ), [props.data]);

    return (
        <BaseChart data={preparedData}/>
    )   
}