export const timeString = (time) => {
    //Always desiplay seconds as 2 digits
    const secondString = (seconds) => { //also works for minutes or any other 2 digit return
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

    //Always display ms as 3 digits
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
    const timeInMilliseconds = Math.abs(time) //Calculate string based on absolute time value to work with < operators
    const timeInSeconds = Math.floor(timeInMilliseconds / 1000)

    const minutes = Math.floor( timeInMilliseconds / 60000 )
    const seconds = Math.floor( (timeInMilliseconds / 1000) - (minutes * 60) )
    const milliseconds = Math.floor(timeInMilliseconds - (timeInSeconds * 1000))

    //Constructing "00:00:000" string
    let returnString = secondString(minutes) + ":" + secondString(seconds) + ":" + millisecondString(milliseconds)

    //Convey a negative value as necessary after computing from absolute value
    if (time < 0) {
        returnString = "-" + returnString
    }

    return returnString
};