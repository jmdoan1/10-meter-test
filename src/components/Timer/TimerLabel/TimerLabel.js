import React, { PureComponent } from 'react';

class TimerLabel extends PureComponent {

    state = {
        time: this.props.time
    }

    update = () => {
        if (this.props.running) {
            this.setState({ time: Date.now() - this.props.startTime })
        }
    }

    secondString = (props) => {
        if (props.seconds) {
            if (props.seconds < 10) {
                return "0" + props.seconds.toString();
            } else {
                return props.seconds.toString();
            }
        } else {
            return "00";
        }
    }

    millisecondString = (props) => {
        if (props.milliseconds) {
            if (props.milliseconds < 10) {
                return "00" + props.milliseconds.toString();
            } else if (props.milliseconds < 100) {
                return "0" + props.milliseconds.toString();
            } else {
                return props.milliseconds.toString();
            }
        } else {
            return "000";
        }
    }

    componentDidMount() {
        //https://stackoverflow.com/a/39426846/4948354
        this.interval = setInterval(() => this.update(), 25);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        //Rounding off as integers then remultiplying to calculate remainders (time minus integerrMinute = time to be converted to seconds, etc )
        const timeInMilliseconds = this.state.time
        const timeInSeconds = Math.floor(timeInMilliseconds / 1000)

        const minutes = Math.floor( timeInMilliseconds / 60000 )
        const seconds = Math.floor( (timeInMilliseconds / 1000) - (minutes * 60) )
        const milliseconds = Math.floor(timeInMilliseconds - (timeInSeconds * 1000))

        return (
            <div>
                <h1>{minutes}:{this.secondString({seconds: seconds})}:{this.millisecondString({milliseconds: milliseconds})}</h1>
            </div>
        )
    };
}

export default TimerLabel;