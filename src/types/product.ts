export interface Product {
  id: number
  name: string
  description: string
  category: string
  brand: string
  price: number
  discount: number // 0, 5, 10, 15, or 20
  rating: number // 0-5 with 0.1 intervals
  stock: number
  createdAt: string
}
