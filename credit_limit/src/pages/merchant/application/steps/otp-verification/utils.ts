export function formatTime(time: number) {
  /*
   * modulus "time % 3600", 3600 is seconds per hour
   * and it's to calculate how many seconds are left after removing the hour
   *
   * Example :
   * 4550 ( 1 Hour 15 Min 50 Seconds )
   * 4550 % 3600 = 950 seconds
   *
   * Afer it get 950 seconds, then convert it into minutes divided by 60
   * 950 / 60 = 15.8 Min => 15 Min with ~~ or Math.floor
   *
   * After it get minutes, then get the remaining seconds of 4550
   * ~~4550 % 60 = 50 seconds
   *
   * So the result is "15:50"
   */
  const minutes = ~~((time % 3600) / 60);
  const remainingSeconds = ~~time % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
