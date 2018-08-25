import React, { PureComponent } from 'react';

class Timer extends PureComponent {
    render () {
        //Rounding off as integers then remultiplying to calculate remainders (time minus integerrMinute = time to be converted to seconds, etc )
        const timeInMilliseconds = this.props.children
        const timeInSeconds = Math.floor(timeInMilliseconds / 1000)

        const minutes = Math.floor( timeInMilliseconds / 60000 )
        const seconds = Math.floor( (timeInMilliseconds / 1000) - (minutes * 60) )
        const milliseconds = Math.floor(timeInMilliseconds - (timeInSeconds * 1000))

        return (
            <div>
                <header>{minutes} minutes</header>
                <header>{seconds} seconds</header>
                <header>{milliseconds} milliseconds</header>
            </div>
        )
    };
}

export default Timer;