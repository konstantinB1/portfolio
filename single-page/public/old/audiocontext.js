let sample = 'FonkyFirst.mp3';
var pad = document.querySelector('.pad');

let audioApi = new (window.AudioContext || window.webkitAudioContext)();

let xhr = new XMLHttpRequest();
xhr.open('GET', sample);
xhr.responseType = 'arraybuffer';
pad.onclick = function() {
  audioApi.decodeAudioData(xhr.response, function(audio) {
  	let buffer = audioApi.createBufferSource();
  	buffer.connect(audioApi.destination);
  	buffer.buffer = audio;
  	buffer.start();
  })
}

xhr.send();

var real = new Float32Array(2);
var imag = new Float32Array(2);
var osc = audioApi.createOscillator();

real[0] = 0;
imag[0] = 0;
real[1] = 1;
imag[1] = 0;

var wave = audioApi.createPeriodicWave(real, imag);

osc.setPeriodicWave(wave);

osc.connect(audioApi.destination);

console.log(real);

// osc.start();
// osc.stop(2);
