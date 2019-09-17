export const timerInSecConverter = (string) => {
    const arrayWithNumber = string.split(':');
    return +arrayWithNumber[2] + arrayWithNumber[1] * 60 + arrayWithNumber[0] * 60 * 60
};

export const SecInTimerConverter = (number) => {
    const hours = Math.trunc(number / 3600);
    const minutes = Math.trunc((number - hours*3600) / 60);
    const seconds = Math.trunc(number - hours*3600 - minutes*60);
    const resultHours = hours > 9 ? String(hours) : ('0' + String(hours));
    const resultMinutes = minutes > 9 ? String(minutes) : ('0' + String(minutes));
    const resultSeconds =String(seconds) > 9 ? String(seconds) : ('0' + String(seconds));
    return resultHours+':'+resultMinutes+':'+resultSeconds
};