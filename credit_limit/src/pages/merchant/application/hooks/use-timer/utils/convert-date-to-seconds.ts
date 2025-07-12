function convertDateToSeconds(date: Date) {
  const seconds = Math.round((date.getTime() - new Date().getTime()) / 1000);

  return seconds;
}

export default convertDateToSeconds;
