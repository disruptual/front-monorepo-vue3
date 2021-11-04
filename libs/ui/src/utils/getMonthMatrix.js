import { range } from '@dsp/core';
import { getYear, getMonth, addDays, startOfWeek } from 'date-fns';
import { DAYS } from './constants';

export const getMonthMatrix = (
  { year, month, weekStartsOn } = {
    year: getYear(new Date()),
    month: getMonth(new Date()),
    weekStartsOn: DAYS.MONDAY
  }
) => {
  const rows = range(6);
  const cols = range(7);
  const matrix = [];
  const date = new Date(year, month);
  let currentDate = startOfWeek(date, { weekStartsOn });

  rows.forEach(() => {
    const week = [];
    cols.forEach(() => {
      week.push(currentDate);
      currentDate = addDays(currentDate, 1);
    });

    matrix.push(week);
  });

  return matrix;
};
