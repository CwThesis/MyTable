import { ref, toRaw } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Dish } from '../types'
//import menuAPIService from '../services/menuAPI'

export const useMenuStore = defineStore('menu', () => {
  let currentNewDish: Ref<any> = ref()
  let dishes: Ref<Dish[]> = ref([])

  function addToDishes(newDish: Dish) {
    if (newDish) {
      const dishesArray = toRaw(dishes)
      dishesArray.value.unshift(newDish)
    }
  }

  function deleteFromDishes(dishId: string) {
    dishes.value.splice(
      dishes.value.findIndex((dish) => dish.id === dishId),
      1,
    )
    console.log('To delete from store:', dishId)
  }

  function updateDish(dishUpdated: Dish) {
    dishes.value.splice(
      dishes.value.findIndex((dish) => dish.id === dishUpdated.id),
      1,
      dishUpdated,
    )
  }

  function updateActiveMenu() {
    //
  }

  return { currentNewDish, dishes, addToDishes, deleteFromDishes, updateDish }
})
