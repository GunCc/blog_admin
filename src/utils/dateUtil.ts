import dayjs from 'dayjs'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function formatToDateTime(
    date: dayjs.Dayjs | undefined = undefined,
    format = DATE_TIME_FORMAT
): string {
    return dayjs(date).format(format)
}