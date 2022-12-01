export type AWSUser = {
  username: string
  userSub: string
}

declare global {
  interface Window {
    cloudinary: any
  }
}

export type Dish = {
  img: string
  title: string
  description: string
  price: number
  currency: string
  category: 'mains' | 'starters' | 'desserts' | 'drinks'
  id: string
}

export type DishIdWithAmount = {
  id: string
  amount: number
}
