import React, { PureComponent } from 'react';

import { timeString } from '../../../models/TimeString'

class TimerLabel extends PureComponent {
    render () {
        return (
            <h1>{timeString(this.props.time)}</h1>
        )
    };
}

export default TimerLabel;