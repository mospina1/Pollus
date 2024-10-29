const time_line = docement.querySelector("header .time_line")
const timeText = docement.querySelector(".timer .time_left_txt")
const timeCount = docement.querySelector(".timer .timer_sec")

function starttimer(time){
const timer = setInterval(startTimer,1000);
funtion timert(){
timeCout.textContent = time;
time--;
if (time < 9){
let addZero = timecount.textContent;
timeCount.textContent = "0" + addZero
}
if(time < 0){
clearInterval(timer);
timeText.textContent = "Time Off"
}
timeamount = 60
starttimer(timeamount)


