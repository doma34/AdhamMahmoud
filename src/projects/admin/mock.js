export const STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

export const ORDERS = Array.from({ length: 48 }).map((_, i) => {
  const status = STATUSES[i % STATUSES.length]
  const amount = 180 + (i * 53) % 2500
  const day = 1 + (i % 28)
  const date = `2025-11-${String(day).padStart(2,'0')}`
  return {
    id: `NOON-${10010 + i}`,
    customer: ['Ahmed','Mona','Youssef','Sara','Omar','Nada'][i % 6],
    status,
    amount,
    date,
  }
})
