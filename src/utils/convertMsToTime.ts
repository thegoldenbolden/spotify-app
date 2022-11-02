export default function convertMsToTime(time: number) {
 let [ms, mins, secs, hrs]: number[] = [];

 ms = time % 1000;
 time = (time - ms) / 1000;
 secs = time % 60;
 time = (time - secs) / 60;
 mins = time % 60;
 hrs = (time - mins) / 60;

 let str = '';
 if (hrs > 0) {
  str += hrs.toString().padStart(2, '0') + ':';
 }

 str += mins.toString().padStart(2, '0') + ':';
 str += secs.toString().padStart(2, '0');

 return str;
}
