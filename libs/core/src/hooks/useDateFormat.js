import frLocale from 'date-fns/locale/fr';
import { format as formatDate } from 'date-fns';

export const useDateFormat = () => {
  return {
    format: (date, dateFormat = 'dd-MM-yyyy') =>
      formatDate(new Date(date), dateFormat, {
        locale: frLocale
      })
  };
};
