let $video = document.querySelector('#video');
let $play = document.querySelector('#play');
let $backward = document.querySelector('#backward');
let $forward = document.querySelector('#forward');
let $pause = document.querySelector('#pause');
let $progress = document.querySelector('#progress');
let porcent;
let tooltip = document.getElementById('tooltip');
let tValue = document.getElementById('tValue');
let $widthBar = document.documentElement.style;
let xyz;

$play.addEventListener("click", handlePlay);

function handlePlay() {
    $video.play()
    $play.hidden = true
    $pause.hidden = false
    if (porcent >= "100") {
        tooltip.style.left = "3.5%"
    }
}
$pause.addEventListener("click", handlePause);
function handlePause() {
    $video.pause()
    $play.hidden = false
    $pause.hidden = true
    if (porcent >= "3.50") {
        tooltip.style.left = porcent + "%";
    }
    if (porcent >= "97.5") {
        tooltip.style.left = "97.5%";
    }
}
$backward.addEventListener('click', handleBackward)
function handleBackward() {
    $video.currentTime = $video.currentTime - 10

    tValue.innerHTML = secondsToString($video.currentTime);
    console.log('retroceder', $video.currentTime)

    if (porcent >= "3.50") {
        tooltip.style.left = porcent + "%";
    }
    if (porcent >= "97.5") {
        tooltip.style.left = "97.5%";
    }
}
$forward.addEventListener('click', handleForward)
function handleForward() {
    $video.currentTime = $video.currentTime + 10
    tValue.innerHTML = secondsToString($video.currentTime);
    console.log('adelante', $video.currentTime)
    if (porcent >= "3.50") {
        tooltip.style.left = porcent + "%";
    }
    if (porcent >= "97.5") {
        tooltip.style.left = "97.5%";
    }
}

$video.addEventListener('loadedmetadata', handleLoaded)
$video.addEventListener('timeupdate', handleTimeUpdate)
$progress.addEventListener('input', handleInput)

function handleLoaded() {
    $progress.max = $video.duration
}
function handleTimeUpdate() {
    $progress.value = $video.currentTime;

    tValue.innerHTML = secondsToString($video.currentTime);

    porcent = $video.currentTime * 100 / $video.duration;

    if (porcent >= "3.50") {
        tooltip.style.left = porcent + "%";
    }
    if (porcent >= "97.5") {
        tooltip.style.left = "97.5%";
    }

    $widthBar.setProperty("--widthBar", `${porcent}%`);
}

tValue.innerHTML = $video.currentTime;

function handleInput() {
    $video.currentTime = $progress.value;

    tValue.innerHTML = secondsToString($video.currentTime);

    porcent = $video.currentTime * 100 / $video.duration;

    if (porcent >= "3.50") {
        tooltip.style.left = porcent + "%";
    }
    if (porcent >= "97.5") {
        tooltip.style.left = "97.5%";
    }

    $widthBar.setProperty("--widthBar", `${porcent}%`);

    console.log($video.currentTime + "handleInput")
}

function secondsToString(xyz) {
    var hour = Math.floor(xyz / 3600);
    hour = (Math.round(hour) <= 9) ? '0' + Math.round(hour) : Math.round(hour);
    var minute = Math.floor((xyz / 60) % 60);
    minute = (Math.round(minute) <= 9) ? '0' + Math.round(minute) : Math.round(minute);
    var second = xyz % 60;
    second = (Math.round(second) <= 9) ? '0' + Math.round(second) : Math.round(second);
    console.log(second)
    return hour + ':' + minute + ':' + second;
}