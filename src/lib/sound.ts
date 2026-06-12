// Hệ thống âm thanh huyền bí — tổng hợp trực tiếp bằng Web Audio API.
// Không dùng file nhạc: mọi âm được sinh ra từ dao động (oscillator) + nhiễu,
// nên chạy offline, không nặng, không lo bản quyền. Âm dựa trên thang ngũ cung
// (pentatonic) để mọi nốt luôn hoà hợp, gợi cảm giác thiền định & kết nối.

let ctx: AudioContext | null = null
let master: GainNode | null = null
let reverb: ConvolverNode | null = null
let muted = readMuted()

function readMuted(): boolean {
  try {
    return localStorage.getItem('hb-muted') === '1'
  } catch {
    return false
  }
}

/** Tạo (một lần) ngữ cảnh âm thanh + bus tổng + buồng vọng (reverb) nhẹ. */
function ensure(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (ctx) return ctx
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  ctx = new AC()

  master = ctx.createGain()
  master.gain.value = muted ? 0 : 0.45
  master.connect(ctx.destination)

  // buồng vọng ngắn để âm chuông ngân & "rộng" như trong không gian thiền
  reverb = ctx.createConvolver()
  reverb.buffer = makeImpulse(ctx, 2.6, 2.4)
  const reverbGain = ctx.createGain()
  reverbGain.gain.value = 0.28
  reverb.connect(reverbGain).connect(master)

  return ctx
}

/** Tạo đáp ứng xung (impulse response) cho reverb bằng nhiễu suy giảm. */
function makeImpulse(ac: AudioContext, seconds: number, decay: number): AudioBuffer {
  const rate = ac.sampleRate
  const len = Math.floor(rate * seconds)
  const buf = ac.createBuffer(2, len, rate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch)
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay)
    }
  }
  return buf
}

/** Mở khoá ngữ cảnh âm thanh — phải gọi trong một cử chỉ người dùng (click). */
export function unlockAudio(): void {
  const c = ensure()
  if (c && c.state === 'suspended') void c.resume()
}

export function isMuted(): boolean {
  return muted
}

export function setMuted(value: boolean): void {
  muted = value
  try {
    localStorage.setItem('hb-muted', value ? '1' : '0')
  } catch {
    /* bỏ qua nếu chặn localStorage */
  }
  if (master && ctx) {
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(value ? 0 : 0.45, ctx.currentTime + 0.25)
  }
}

export function toggleMuted(): boolean {
  setMuted(!muted)
  return muted
}

// Thang ngũ cung (A minor pentatonic) trải trên 3 quãng tám → 15 nốt êm tai.
const PENTA_SEMITONES = [0, 3, 5, 7, 10]
const BASE_FREQ = 196 // G3 — trầm ấm, thiền

function noteFreq(degree: number): number {
  const idx = ((degree % 15) + 15) % 15
  const octave = Math.floor(idx / 5)
  const semis = PENTA_SEMITONES[idx % 5] + octave * 12
  return BASE_FREQ * Math.pow(2, semis / 12)
}

/** Băm chuỗi id lá bài thành một số ổn định → mỗi lá luôn có "giọng" riêng. */
export function hashToDegree(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return Math.abs(h)
}

/**
 * Tiếng chuông Tây Tạng (singing bowl): hai sine hơi lệch tần + một bồi âm cao
 * lấp lánh, suy giảm dài & mượt. Mỗi lá bài cho một nốt trong thang ngũ cung,
 * nên người dùng "nghe" được năng lượng riêng của từng lá khi chạm.
 */
export function playChime(degree: number, opts: { gain?: number; duration?: number } = {}): void {
  const c = ensure()
  if (!c || !master || !reverb || muted) return
  if (c.state === 'suspended') void c.resume()

  const now = c.currentTime
  const freq = noteFreq(degree)
  const dur = opts.duration ?? 2.4
  const peak = opts.gain ?? 0.22

  const bus = c.createGain()
  bus.gain.setValueAtTime(0.0001, now)
  // vào nhẹ (~50ms) thay vì "ping" gắt, rồi ngân tắt mượt
  bus.gain.exponentialRampToValueAtTime(peak, now + 0.05)
  bus.gain.exponentialRampToValueAtTime(0.0001, now + dur)

  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  // chặn dải cao ngay từ đầu cho ấm & sang, bớt chói
  lp.frequency.setValueAtTime(2200, now)
  lp.frequency.exponentialRampToValueAtTime(700, now + dur)

  bus.connect(lp)
  lp.connect(master)
  lp.connect(reverb)

  // bồi âm hài hoà (2× , 3×) cho âm ấm tròn — bỏ các bồi âm lệch gây tiếng kim loại
  const partials: [number, number][] = [
    [1, 1],
    [2, 0.18],
    [3, 0.06],
  ]
  for (const [mult, amp] of partials) {
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq * mult
    // dao động lệch nhẹ tạo hiệu ứng "beating" sống động
    const detune = c.createOscillator()
    detune.frequency.value = 0.7
    const detuneGain = c.createGain()
    detuneGain.gain.value = freq * mult * 0.004
    detune.connect(detuneGain).connect(osc.frequency)

    const g = c.createGain()
    g.gain.value = amp
    osc.connect(g).connect(bus)
    osc.start(now)
    detune.start(now)
    osc.stop(now + dur + 0.1)
    detune.stop(now + dur + 0.1)
  }
}

/**
 * Một nốt "bling" thuỷ tinh: cao, trong, tắt rất nhanh — sạch & lấp lánh.
 * Dùng sine gốc + một bồi âm quãng tám nhẹ, không reverb dày để khỏi nặng.
 */
function playBling(degree: number, delay: number, gain: number): void {
  const c = ensure()
  if (!c || !master || !reverb || muted) return
  if (c.state === 'suspended') void c.resume()

  const at = c.currentTime + delay
  const freq = noteFreq(degree) * 3 // đẩy lên quãng cao cho trong trẻo, lấp lánh
  const dur = 0.55

  const env = c.createGain()
  env.gain.setValueAtTime(0.0001, at)
  env.gain.exponentialRampToValueAtTime(gain, at + 0.008) // chạm nhẹ tức thì
  env.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  env.connect(master)
  // chút vọng rất nhẹ cho long lanh
  const send = c.createGain()
  send.gain.value = 0.35
  env.connect(send).connect(reverb)

  for (const [mult, amp] of [[1, 1], [2.0, 0.3]] as [number, number][]) {
    const osc = c.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq * mult
    const g = c.createGain()
    g.gain.value = amp
    osc.connect(g).connect(env)
    osc.start(at)
    osc.stop(at + dur + 0.05)
  }
}

/** Âm khi chọn một lá: hai tiếng "bling-bling" nhẹ, cao độ riêng theo từng lá. */
export function playPick(cardId: string): void {
  const deg = hashToDegree(cardId)
  playBling(deg, 0, 0.16)
  playBling(deg + 2, 0.085, 0.12) // nốt thứ hai nhỉnh cao hơn, trễ ~85ms
}

/** Âm khi lật một lá lúc luận giải: một tiếng bling đơn, êm hơn chút. */
export function playReveal(cardId: string): void {
  playBling(hashToDegree(cardId), 0, 0.13)
}

/**
 * Tiếng xóc bài (riffle): chuỗi "tách tách" nhanh dần rồi thưa lại như khi
 * các lá đan vào nhau, kèm hơi gió nhẹ ở đuôi — mô phỏng động tác xóc thật.
 */
export function playShuffle(): void {
  const c = ensure()
  if (!c || !master || muted) return
  if (c.state === 'suspended') void c.resume()

  const now = c.currentTime
  const out = c.createGain()
  out.gain.value = 0.5
  out.connect(master)

  // ~26 lá rơi đan nhau: mỗi lá là một "tách" lọc băng thông từ nhiễu ngắn
  const flicks = 26
  for (let i = 0; i < flicks; i++) {
    // nhịp: nhanh ở giữa (đỉnh xóc), chậm ở đầu & cuối
    const t = i / flicks
    const ease = 0.5 - 0.5 * Math.cos(t * Math.PI * 2) // 0→1→0
    const at = now + i * (0.012 + 0.02 * (1 - ease))

    const src = c.createBufferSource()
    src.buffer = noiseBurst(c, 0.03)
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 1800 + Math.random() * 2600
    bp.Q.value = 7

    const g = c.createGain()
    const amp = 0.12 + 0.16 * ease
    g.gain.setValueAtTime(0.0001, at)
    g.gain.exponentialRampToValueAtTime(amp, at + 0.003)
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.045)

    src.connect(bp).connect(g).connect(out)
    src.start(at)
    src.stop(at + 0.06)
  }

  // hơi gió "ậc" cuối khi bộ bài khít lại
  const whoosh = c.createBufferSource()
  whoosh.buffer = noiseBurst(c, 0.5)
  const wf = c.createBiquadFilter()
  wf.type = 'lowpass'
  wf.frequency.value = 900
  const wg = c.createGain()
  const wt = now + flicks * 0.016
  wg.gain.setValueAtTime(0.0001, wt)
  wg.gain.exponentialRampToValueAtTime(0.14, wt + 0.05)
  wg.gain.exponentialRampToValueAtTime(0.0001, wt + 0.4)
  whoosh.connect(wf).connect(wg).connect(out)
  whoosh.start(wt)
  whoosh.stop(wt + 0.5)
}

let noiseBuf: AudioBuffer | null = null
function noiseBurst(c: AudioContext, seconds: number): AudioBuffer {
  // dùng lại một buffer nhiễu trắng đủ dài, cắt theo nhu cầu
  const need = Math.floor(c.sampleRate * seconds)
  if (!noiseBuf || noiseBuf.length < need) {
    const len = Math.max(need, Math.floor(c.sampleRate * 0.5))
    noiseBuf = c.createBuffer(1, len, c.sampleRate)
    const data = noiseBuf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  }
  return noiseBuf
}
