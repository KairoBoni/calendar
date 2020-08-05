import { Event } from '../types'


const verifyIntervals = (start: number, end: number , e: Event): boolean => {
    if(start == e.start && end == e.end){
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