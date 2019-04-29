import * as React from "react";
import axios from "~/common/axiosConfigure.ts";
import TimeInterval from "~/components/Profile/TimeInterval";
import "./Statistic.scss";
import Paper from "@material-ui/core/Paper";
import TooltipMaterialUI from "@material-ui/core/Tooltip";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    ComposedChart,
    Bar,
} from "recharts";

export interface StatisticType {
    // general
    activityTimeTotal: number;
    activeDayTotal: number;
    // running
    runningDistanceTotal: number;
    runningRank: string;
    runningDistanceRating: number;
    runningTimeTotal: number;
    // cycling
    cyclingDistanceTotal: number;
    cyclingTimeTotal: number;
    // gym
    gymTimeTotal: number;
    // meditation
    meditationTimeTotal: number;
    // climbing
    climbingTimeTotal: number;
    // skating
    skatingTimeTotal: number;
    // swimming
    swimmingTimeTotal: number;
    // yoga
    yogaTimeTotal: number;
    // hiking
    hikingTimeTotal: number;
}
export interface GraphicalStatisticType {
    activityTypeName: string;
    activityDataDTOList: [
        { activityDate: string; distance: number; duration: number; velocity: number }
    ];
    active: boolean;
}
interface StatisticState {
    statistic: StatisticType | null;
    graphicalStatistic?: [GraphicalStatisticType];
    interval?: string;
    timeZoneOffset?: number;
}

interface StatisticProps {
    userId?: string;
}

class Statistic extends React.Component<StatisticProps, StatisticState> {
    constructor(props: StatisticProps) {
        super(props);
        const date = new Date();
        this.state = {
            statistic: null,
            interval: "",
            timeZoneOffset: date.getTimezoneOffset(),
        };
    }

    componentDidMount(): void {
        this.updateData("4");
    }

    private updateData = async (index: string) => {
        const tempInterval = index;
        const url: string =
            process.env.LOCAL_HOST_URL +
            `/accounts/statistic/${this.props.userId}?timeinterval=${tempInterval}&timezoneoffset=${
                this.state.timeZoneOffset
            }`;
        axios.get(url).then(response => {
            this.setState({
                statistic: response.data,
                interval: tempInterval,
            });
        });
        const urlGraphical: string =
            process.env.LOCAL_HOST_URL +
            `/accounts/graphicalStatistic/${
                this.props.userId
            }?timeinterval=${tempInterval}&timezoneoffset=${this.state.timeZoneOffset}`;
        axios.get(urlGraphical).then(response => {
            this.setState({ graphicalStatistic: response.data });
        });
    };

    // private calculateWidth = (time: number, totalTime: number) => {
    //     return (time * 100) / totalTime + "%";
    // };

    render(): React.ReactNode {
        if (this.state.statistic == null || this.state.graphicalStatistic == null) {
            return <div />;
        }
        const chartKmPH = this.state.graphicalStatistic
            .filter(
                graphic =>
                    graphic.active &&
                    (graphic.activityTypeName !== "Climbing" &&
                        graphic.activityTypeName !== "Gym") &&
                    graphic.activityTypeName !== "Yoga" &&
                    graphic.activityTypeName !== "Meditation",
            )
            .map(graphicStaistics => {
                return (
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div className="line-seperate-chart" />
                        <TooltipMaterialUI title={graphicStaistics.activityTypeName}>
                            <img
                                alt="Cannot load icon"
                                src={require("../../theme/images/" +
                                    graphicStaistics.activityTypeName.toLowerCase() +
                                    ".png")}
                            />
                        </TooltipMaterialUI>
                        {/*<span className="chart-title">{graphicStaistics.activityTypeName}</span>*/}
                        <ResponsiveContainer width="100%" height={320} debounce={31}>
                            <ComposedChart
                                width={600}
                                height={400}
                                data={graphicStaistics.activityDataDTOList}
                            >
                                <CartesianGrid vertical={true} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="activityDate"
                                    label={{
                                        value: "Date",
                                        position: "insideBottomRight",
                                        offset: 0,
                                    }}
                                />
                                <YAxis
                                    label={{
                                        value: "Distance",
                                        angle: -90,
                                        position: "insideLeft",
                                    }}
                                />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="duration"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    fillOpacity={0.7}
                                    unit="hrs"
                                />
                                <Bar dataKey="distance" barSize={20} fill="#0C88C2" unit="km" />
                                <Line
                                    type="monotone"
                                    dataKey="velocity"
                                    stroke="#ff7300"
                                    unit="km/h"
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                );
            });
        const chartMPM = this.state.graphicalStatistic
            .filter(graphic => graphic.active && graphic.activityTypeName === "Climbing")
            .map(graphicStaistics => {
                return (
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div className="line-seperate-chart" />
                        <TooltipMaterialUI title={graphicStaistics.activityTypeName}>
                            <img
                                alt="Cannot load icon"
                                src={require("../../theme/images/" +
                                    graphicStaistics.activityTypeName.toLowerCase() +
                                    ".png")}
                            />
                        </TooltipMaterialUI>
                        {/*<span className="chart-title">{graphicStaistics.activityTypeName}</span>*/}
                        <ResponsiveContainer width="100%" height={320} debounce={31}>
                            <ComposedChart
                                width={600}
                                height={400}
                                data={graphicStaistics.activityDataDTOList}
                            >
                                <CartesianGrid vertical={true} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="activityDate"
                                    label={{
                                        value: "Date",
                                        position: "insideBottomRight",
                                        offset: 0,
                                    }}
                                />
                                <YAxis
                                    label={{
                                        value: "Distance",
                                        angle: -90,
                                        position: "insideLeft",
                                    }}
                                />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="duration"
                                    fill="#8884d8"
                                    stroke="#8884d8"
                                    fillOpacity={0.7}
                                    unit="mins"
                                />
                                <Bar dataKey="distance" barSize={20} fill="#0C88C2" unit="m" />
                                {/*<Line*/}
                                {/*type="monotone"*/}
                                {/*dataKey="velocity"*/}
                                {/*stroke="#ff7300"*/}
                                {/*unit="m/min"*/}
                                {/*/>*/}
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                );
            });
        const chartDuration = this.state.graphicalStatistic
            .filter(
                graphic =>
                    graphic.active &&
                    (graphic.activityTypeName === "Yoga" ||
                        graphic.activityTypeName === "Gym" ||
                        graphic.activityTypeName === "Medidation"),
            )
            .map(graphicStaistics => {
                return (
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <div>
                            <div className="line-seperate-chart" />
                            <TooltipMaterialUI title={graphicStaistics.activityTypeName}>
                                <img
                                    alt="Cannot load icon"
                                    src={require("../../theme/images/" +
                                        graphicStaistics.activityTypeName.toLowerCase() +
                                        ".png")}
                                />
                            </TooltipMaterialUI>
                            {/*<span className="chart-title">{graphicStaistics.activityTypeName}</span>*/}
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart
                                data={graphicStaistics.activityDataDTOList}
                                width={window.innerWidth * 0.9}
                                height={250}
                                className="chart-line"
                            >
                                <XAxis dataKey="activityDate" />
                                <YAxis dataKey="duration" yAxisId="duration" />
                                <CartesianGrid vertical={true} strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    yAxisId="duration"
                                    type="monotone"
                                    dataKey="duration"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                    unit="hrs"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                );
            });

        // const distanceTotal =
        //     this.state.statistic.runningDistanceTotal + this.state.statistic.cyclingDistanceTotal;
        const timeTotal = parseFloat((this.state.statistic.activityTimeTotal / 3600).toFixed(2));
        return (
            <div>
                <Paper style={{ backgroundColor: "#f5eeee73", height: "fit-content" }}>
                    <div
                        style={{
                            textAlign: "right",
                            paddingTop: "10px",
                            paddingRight: "10px",
                            paddingBottom: "15px",
                        }}
                    >
                        <TimeInterval updateData={this.updateData.bind(this)} />
                    </div>
                    <div>
                        <div className="general">Total time: {timeTotal} hour(s)</div>
                        <div className="general">
                            Total days: {this.state.statistic.activeDayTotal} day(s)
                        </div>
                        {this.state.statistic.runningRank !== "-" && (
                            <div className="general">
                                Running rank: {this.state.statistic.runningRank}
                            </div>
                        )}
                        <div>
                            <div className="charts">
                                {/*Chart for distance*/}
                                {chartKmPH}
                                {chartMPM}
                                {chartDuration}
                                {/*{distanceTotal !== 0.0 && (*/}
                                {/*<div>*/}
                                {/*<span className="chart-title">Distance</span>*/}
                                {/*<div className="chart-horiz">*/}
                                {/*<BarChart*/}
                                {/*name={"Running"}*/}
                                {/*stat={this.state.statistic.runningDistanceTotal}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.runningDistanceTotal,*/}
                                {/*distanceTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Cycling"}*/}
                                {/*stat={this.state.statistic.cyclingDistanceTotal}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.cyclingDistanceTotal,*/}
                                {/*distanceTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*)}*/}
                                {/*/!*Chart for time*!/*/}
                                {/*<div>*/}
                                {/*<span className="chart-title">Time</span>*/}
                                {/*<BarChart*/}
                                {/*name={"Running"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.runningTimeTotal / 3600).toFixed(*/}
                                {/*2,*/}
                                {/*),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.runningTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Cycling"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.cyclingTimeTotal / 3600).toFixed(*/}
                                {/*2,*/}
                                {/*),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.cyclingTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Yoga"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.yogaTimeTotal / 3600).toFixed(2),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.yogaTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Hiking"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.hikingTimeTotal / 3600).toFixed(*/}
                                {/*2,*/}
                                {/*),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.hikingTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Skating"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.skatingTimeTotal / 3600).toFixed(*/}
                                {/*2,*/}
                                {/*),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.skatingTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Swimming"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.swimmingTimeTotal / 3600).toFixed(*/}
                                {/*2,*/}
                                {/*),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.swimmingTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Gym"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.gymTimeTotal / 3600).toFixed(2),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.gymTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Meditation"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(*/}
                                {/*this.state.statistic.meditationTimeTotal / 3600*/}
                                {/*).toFixed(2),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.meditationTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*<BarChart*/}
                                {/*name={"Climbing"}*/}
                                {/*stat={parseFloat(*/}
                                {/*(this.state.statistic.climbingTimeTotal / 3600).toFixed(*/}
                                {/*2,*/}
                                {/*),*/}
                                {/*)}*/}
                                {/*percent={this.calculateWidth(*/}
                                {/*this.state.statistic.climbingTimeTotal,*/}
                                {/*this.state.statistic.activityTimeTotal,*/}
                                {/*)}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*Chart for rating*/}
                                {/*{this.state.statistic.runningDistanceRating !== 0.0 && (*/}
                                {/*<div>*/}
                                {/*<span className="chart-title">Rating</span>*/}
                                {/*<BarChart*/}
                                {/*name={"Running"}*/}
                                {/*stat={this.state.statistic.runningDistanceRating}*/}
                                {/*percent={`${*/}
                                {/*this.state.statistic.runningDistanceRating*/}
                                {/*}%`}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*)}*/}
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}
export default Statistic;
