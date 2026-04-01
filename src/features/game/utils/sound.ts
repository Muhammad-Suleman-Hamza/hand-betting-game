// [Topic: Web Audio API Sound Effects]

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }
  return audioContext;
}

function playTone(
  frequency: number,
  duration = 0.12,
  type: OscillatorType = "sine",
  volume = 0.03
) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + duration
  );

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + duration);
}

export function playTileClick() {
  playTone(520, 0.05, "square", 0.02);
}

export function playWinSound() {
  playTone(660, 0.08, "triangle", 0.03);
  setTimeout(() => playTone(880, 0.1, "triangle", 0.03), 70);
  setTimeout(() => playTone(1040, 0.12, "triangle", 0.03), 140);
}

export function playLoseSound() {
  playTone(320, 0.12, "sawtooth", 0.025);
  setTimeout(() => playTone(220, 0.16, "sawtooth", 0.025), 90);
}