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
  category: 'mains' | 'starters' | 'soups' | 'desserts' | 'drinks'
  id: string
}
export type Banner = {
  url: string
  title: string
}

export type DishIdWithAmount = {
  id: string
  amount: number
  name: string
  img: string
  price: number
}
