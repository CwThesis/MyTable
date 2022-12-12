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
  imgUrl: string
  title: string
  description: string
  price: number
  currency: string
  menu: boolean
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

export type Staff = {
  id: string
  name: string
  restaurantId: string
  role: number
}
