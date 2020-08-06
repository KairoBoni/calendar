import { Event } from '../types'


const verifyIntervals = (start: number, end: number , e: Event): boolean => {
    if(start === e.start && end === e.end){
        return true
    }
    if (e.start < end && e.end > end){
      return false
    }
    if (e.start < start && e.end > start){
      return false
    }
    if(e.start < start && end < e.end) {
      return false
    }
    return true
  }

export const VerifyTimes = (start: Date, end: Date, userEvents: Event[]): boolean => {
    const startTime = start.getTime()
    const endTime = end.getTime()
    if (startTime > endTime) {
        return false
    }

    for(let i = 0; i < userEvents.length; i++) {
        if (!verifyIntervals(startTime, endTime, userEvents[i])){
        return false
        }
    }
    return true
}


export function timeConverter(UNIX_timestamp: number){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}