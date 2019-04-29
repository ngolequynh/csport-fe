import * as React from "react";
import TextField from "@material-ui/core/TextField";
import "./timerStyle.css";
import { isIOS } from "react-device-detect";

const enum TimerCSS {
    Digit = "act-tim-digit",
    Edit = "act-tim-digit act-tim-cursor",
}
// Position Id of the span tag. S or s = sencond. F or f = first
const enum PosID {
    HourS = "sHourId",
    HourF = "fHourId",
    MinS = "sMinId",
    MinF = "fMinId",
}

interface TimerProps {
    id: string;
    defaultValue: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    label?: string;
    error?: boolean;
    helperText?: string;
}

interface TimerState {
    value: string;
}
class Timer extends React.Component<TimerProps, TimerState> {
    constructor(props: TimerProps) {
        super(props);
        this.state = { value: this.props.defaultValue };
    }

    render(): React.ReactNode {
        const { id, error, helperText, label } = this.props;
        const renderSpan = (id: PosID): JSX.Element => {
            return (
                <span onClick={this.handleSpanClick} className={TimerCSS.Digit} id={id}>
                    {this.getDigit(id)}
                </span>
            );
        };

        const getInputCSS = (): string => {
            let css = "act-tim-hid-input";
            if (isIOS) {
                css = "act-tim-hid-input-ios";
            }
            return css;
        };

        const getTimerCSS = (): string => {
            let css = "timer";
            if (isIOS) {
                css = "timer-ios";
            }
            return css;
        };

        return (
            <div style={{ width: "100%", marginTop: 36 }} onClick={this.handleTimerClick}>
                <div className={getTimerCSS()}>
                    {renderSpan(PosID.HourS)}
                    {renderSpan(PosID.HourF)}
                    <span className="act-tim-sep">h</span>
                    {renderSpan(PosID.MinS)}
                    {renderSpan(PosID.MinF)}
                    <span className="act-tim-sep">m</span>
                </div>
                <TextField
                    id={id}
                    label={label}
                    value={this.state.value}
                    error={error}
                    helperText={helperText}
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    onFocus={this.handleFocus}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoComplete={"off"}
                    className={getInputCSS()}
                    fullWidth
                />
            </div>
        );
    }

    private handleFocus = (): void => {
        const timer = document.getElementsByClassName("timer-ios");
        if (timer.length > 0 && isIOS) {
            timer[0].className = "timer-ios";
        }
    };

    /**
     * When a time digit span tag was clicked, move the caret position form old one to new one.
     * If there is no span tag clicked before, caret position will be at fist min postition.
     */
    private handleSpanClick = (evt: React.MouseEvent<HTMLSpanElement>): void => {
        // Change the CSS
        const spanTags = document.getElementsByClassName(TimerCSS.Edit);
        const clickedSpan = evt.target as HTMLSpanElement;
        let pos = 0;
        if (spanTags.length === 1 && this.state.value !== "0000") {
            spanTags[0].className = TimerCSS.Digit;
            clickedSpan.className = TimerCSS.Edit;
            pos = this.getPosition(clickedSpan.id as PosID);
        } else {
            const fminTag = document.getElementById(PosID.MinF);
            if (fminTag) {
                fminTag.className = TimerCSS.Edit;
                pos = this.getPosition(PosID.MinF);
            }
        }
        // Move the caret position
        this.setCaretPosition(pos);
    };

    private handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const value = evt.target.value.trim();
        const num4Digits = ("0000" + value).slice(-4);
        if (!isNaN(Number(num4Digits))) {
            this.setState({ value: num4Digits });
            this.resetCSS();
        }
        if (isIOS) {
            const timer = document.getElementsByClassName("timer-ios");
            if (timer.length > 0) {
                timer[0].className = "timer";
            }
        }
    };

    private handleTimerClick = (evt: React.MouseEvent<HTMLElement>): void => {
        const element = evt.target as HTMLElement;
        if (element.tagName !== "SPAN") {
            this.focusInput();
        }
    };

    private handleOnBlur = (): void => {
        const spanTags = document.getElementsByClassName(TimerCSS.Edit);
        if (spanTags.length === 1) {
            spanTags[0].className = TimerCSS.Digit;
        }
        this.props.setFieldValue(this.props.id, this.state.value);
    };

    private resetCSS = (): void => {
        const spanTags = document.getElementsByClassName(TimerCSS.Edit);
        if (spanTags.length === 1) {
            spanTags[0].className = TimerCSS.Digit;
        } else {
            const fminTag = document.getElementById(PosID.MinF);
            if (fminTag) {
                fminTag.className = TimerCSS.Edit;
            }
        }
    };

    private setCaretPosition = (pos: number): void => {
        const mInput = document.getElementById(this.props.id) as HTMLInputElement;
        let newPos = mInput.value.length - pos + 1;
        newPos = newPos > -1 ? newPos : 0;
        mInput.selectionStart = mInput.selectionEnd = newPos;
        mInput.focus();
    };

    private getDigit = (posId: PosID): string => {
        const position = this.getPosition(posId);
        return this.state.value.slice(4 - position, 4 - position + 1) || "0";
    };

    private getPosition = (posId: PosID): number => {
        let pos = 4;
        switch (posId) {
            case PosID.MinF:
                pos = 1;
                break;
            case PosID.MinS:
                pos = 2;
                break;
            case PosID.HourF:
                pos = 3;
                break;
            case PosID.HourS:
                pos = 4;
                break;
        }
        return pos;
    };

    private focusInput = (): void => {
        const mInput = document.getElementById(this.props.id) as HTMLInputElement;
        mInput.focus();
    };
}

export default Timer;
