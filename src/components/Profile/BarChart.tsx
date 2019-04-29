import * as React from "react";
import "./Statistic.scss";

interface BarChartProps {
    name: string;
    stat: number;
    percent: string;
}
function BarChart(props: BarChartProps): JSX.Element {
    if (props.stat === 0) {
        return <span />;
    }
    return (
        <div>
            <span className="chart-label">{props.name}</span>
            <div className="chart-bar" style={{ width: props.percent }}>
                <span className="stat">{props.stat}</span>
            </div>
        </div>
    );
}
export default BarChart;
