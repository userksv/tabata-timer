// const btns = document.querySelectorAll('.btn');
// let count = 0;

const value = document.querySelector('#timer');
const start = document.querySelector('.start');

let workTimer = 5;
let rounds = 2;
let restTimer = 3;
let cycles = 2;
let restBCycle = 2;

let intervalID;
let flag;
let isPaused = true;


startWorkout = () => {
    if(!intervalID){//first start
        work();
    }else if(intervalID === 1){//restart
        work();
    }else if(intervalID === 2){// start rest();
        rest()
    }else if(intervalID === 3){// restart restBtwCycles();
        restBtwCycles();
    }
}
restBtwCycles = () => {
    if(isPaused){
        isPaused = false;
        flag = 3;
        intervalID = setInterval(() => {
            displayTimer(restBCycle, 'blue');
            if(restBCycle === 0){
                if(cycles <= 1){
                    console.log("WORKOUT COMPLETE");    
                    start.textContent = 'start';
                    start.value = '1';
                    clearInterval(intervalID);
                    return;
                }
                clearInterval(intervalID);
                isPaused = true;
                workTimer = 5;
                restTimer = 3;
                rounds = 2;
                cycles--;
                restBCycle = 2;
                work();
                return;
            }
            restBCycle--;
        }, 1000);
    }
}

work = () => {
    if(isPaused){
        isPaused = false;
        flag = 1;
        intervalID = setInterval(() => {
            displayTimer(workTimer, 'red');
            if(workTimer === 0){
                if(rounds <= 1 ){
                    clearInterval(intervalID);
                    isPaused = true;
                    restBtwCycles();
                    return;
                }
                clearInterval(intervalID);
                isPaused = true;
                rest();
                return;
            }
            workTimer--;
        }, 1000);
    }
}

rest = () => {
    if(isPaused){
        isPaused = false;
        flag = 2;
        intervalID = setInterval(() => {
            displayTimer(restTimer, 'green');
            if(restTimer === 0){
                clearInterval(intervalID)
                isPaused = true;
                rounds--;
                workTimer = 5;
                restTimer = 3;
                work();
                return;
            }
            restTimer--;
        }, 1000);
    }
}

pauseTimer = () => {
    isPaused = true;
    clearInterval(intervalID);
    if(flag === 1){
        intervalID = 1;
    }else if(flag === 2){
        intervalID = 2;
    }else if(flag === 3){
        intervalID = 3;
    }
    console.log(intervalID);
}


displayTimer = (time, color) => {
    value.textContent = formatValue(time);
    value.style.color = color;
}

formatValue = (time) => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(Math.trunc(time % 60)).padStart(2, 0);
    return `${minutes}:${seconds}`;
}

parseTimeToSeconds = (time) => {
    let timeArray = time.split(":");
    let minutes = parseInt(timeArray[0]);
    let seconds = parseInt(timeArray[1]);
    return minutes * 60 + seconds;
  }

start.addEventListener('click',()=>{
    switch(start.value){
        case '1':
            start.textContent = 'pause';
            start.value = '0';
            startWorkout();
            break;
        case '0':
            start.textContent = 'start';
            start.value = '1';
            pauseTimer();
            break;
    }
})
