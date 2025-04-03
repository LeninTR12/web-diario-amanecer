import { formatDistanceToNow, parseISO, format, formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";

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
  const date = new Date(isoDate); 
  const isToday = new Date();
  const limitDays = 6*24*60*60*1000;

  const isDistance = (isToday.getTime() - date.getTime()) < (limitDays);

  if(isDistance){
    return getDateDistance(isoDate);
  }
    
  return formatDate(isoDate, "short");
  

}
