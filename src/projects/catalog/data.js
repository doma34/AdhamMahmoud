export const CATEGORIES = ['Phones', 'Laptops', 'Fashion', 'Home', 'Gaming']

export const PRODUCTS = Array.from({ length: 45 }).map((_, i) => {
  const category = CATEGORIES[i % CATEGORIES.length]
  const price = 199 + (i * 37) % 1800
  const rating = (3 + (i % 3) + ((i * 7) % 10) / 10).toFixed(1)
  return {
    id: String(i + 1),
    title: `${category} Item #${i + 1}`,
    category,
    price,
    rating: Number(rating),
    stock: 5 + (i % 25),
    description: 'Simple catalog mock. Built for demonstrating filtering, sorting, pagination, and routing.'
  }
})
