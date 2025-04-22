import {  parseISO, format, formatDistanceToNowStrict } from "date-fns";
import {toZonedTime  } from 'date-fns-tz';
import { es } from "date-fns/locale";
import { SITE, TIMES_CONF } from "../config";

const TIMEZONE = SITE.timeZone;

export const getDateDistance = (date: string) =>
  formatDistanceToNowStrict(parseISO(date), {
    locale: es, 
    addSuffix: true,
    roundingMethod: "floor"
  });

  

export const formatDate = (
  date: string,
  formatDate: "long" | "short" = "long"
) => {
  const parseDate = parseISO(date);
  if (formatDate === "short") {
    return format(parseDate, "MMMM dd, yyyy", {locale: es});
  }

  return format(parseDate, "EEEE, d 'de' MMMM , yyyy hh:mm aaa  ", {locale: es});
};

export const formatDateTime = (isoDate: string) => {
  const date = toZonedTime(new Date(isoDate), TIMEZONE); 
  const isToday = toZonedTime(new Date(), TIMEZONE);

  const limitDays = TIMES_CONF.maxDistanceDays;
  
  const isDistance = (isToday.getTime() - date.getTime()) < (limitDays);

  if(isDistance){
    return getDateDistance(isoDate);
  }
    
  return formatDate(isoDate, "short");
  

}
