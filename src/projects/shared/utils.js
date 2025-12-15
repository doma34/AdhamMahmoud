export function formatEGP(n){
  try { return new Intl.NumberFormat('ar-EG', { style:'currency', currency:'EGP' }).format(n) }
  catch { return `${n} EGP` }
}

export function debounce(fn, delay = 350){
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

export function clamp(n, min, max){
  return Math.max(min, Math.min(max, n))
}
