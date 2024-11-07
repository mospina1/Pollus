let time = 5;

const countdownEl = document.getElementById('countdown');

function changeToResults()
{
    if (time == 0)
    {
        document.location.href = "homepage.html";
    }
}

setInterval(updateCountdown, 1000);
setInterval(changeToResults, 1000);

function updateCountdown() {
    // const minutes = Math.floor(time / 60);
    let seconds = time;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.textContent = `${seconds}`;
    
    time--;
    time = time < 0 ? 0 : time;
}


