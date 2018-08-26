export const timeString = (time) => {
    const secondString = (seconds) => {
        if (seconds) {
            if (seconds < 10) {
                return "0" + seconds.toString();
            } else {
                return seconds.toString();
            }
        } else {
            return "00";
        }
    }

    const millisecondString = (milliseconds) => {
        if (milliseconds) {
            if (milliseconds < 10) {
                return "00" + milliseconds.toString();
            } else if (milliseconds < 100) {
                return "0" + milliseconds.toString();
            } else {
                return milliseconds.toString();
            }
        } else {
            return "000";
        }
    }

    //Rounding off as integers then remultiplying to calculate remainders (time minus integerrMinute = time to be converted to seconds, etc )
    const timeInMilliseconds = time
    const timeInSeconds = Math.floor(timeInMilliseconds / 1000)

    const minutes = Math.floor( timeInMilliseconds / 60000 )
    const seconds = Math.floor( (timeInMilliseconds / 1000) - (minutes * 60) )
    const milliseconds = Math.floor(timeInMilliseconds - (timeInSeconds * 1000))

    return minutes.toString() + ":" + secondString(seconds) + ":" + millisecondString(milliseconds)
};