import dateFormat, { masks } from 'dateformat';

const today = new Date()
const date = dateFormat(today, "fullDate")

function cleanData(data) {
    const activity = {
        key: data.key,
        date: date,
        activity: data.activity,
        link: data.link
    }
   return activity
}


export default cleanData