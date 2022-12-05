import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Dish } from '../types'
//import menuAPIService from '../services/menuAPI'

export const useMenuStore = defineStore('menu', () => {
  const currentNewDish = ref<Dish | null>(null)

  return { currentNewDish }
})
