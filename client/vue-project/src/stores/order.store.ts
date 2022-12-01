import { ref } from "vue";
import { defineStore } from "pinia";
import type { DishIdWithAmount } from "../types";

export const useOrderStore = defineStore("order", () => {
  const dataFromStorage = localStorage.getItem("order");
  const parsedDataFromStorage = JSON.parse(dataFromStorage);
  const currentOrder = ref<DishIdWithAmount[] | null>(
    parsedDataFromStorage && parsedDataFromStorage.CO ? parsedDataFromStorage.CO : null
  );
  const currentTotal = ref<number>(0);

  function addToOrder(dish: DishIdWithAmount, price: number) {
    if (currentOrder.value !== null) {
      if (currentOrder.value.find((d) => d.id === dish.id)) {
        currentOrder.value = currentOrder.value.map((d) =>
          d.id === dish.id ? { ...d, amount: d.amount + dish.amount } : d
        );
      } else currentOrder.value.push(dish);
    } else {
      currentOrder.value = [dish];
    }
    currentTotal.value = currentTotal.value + price;
    localStorage.setItem("order", JSON.stringify({CO: currentOrder.value, CT: currentTotal.value}));
    return currentOrder.value;
  }

  function decrementAmountById(id: string, price: number) {
    if (currentOrder.value !== null) { 
      const dish = currentOrder.value.find((d) => d.id === id);
      currentOrder.value = currentOrder.value.filter((d) => d.id !== id);
      dish.amount = dish.amount -1;
      currentTotal.value = currentTotal.value - price;
      if (dish.amount > 0) {
        currentOrder.value.push(dish)
        localStorage.setItem("order", JSON.stringify({CO: currentOrder.value, CT: currentTotal.value}));
      }

      if (currentOrder.value.length === 0 || (currentOrder.value.length ===1 && currentOrder.value[0].amount === 0)) {
        currentOrder.value = null;
        localStorage.setItem("order", JSON.stringify({CO: currentOrder.value, CT: currentTotal.value}));
    }
  }
}

  function amountById(id: string) {
    if (currentOrder.value !== null) {
      const dish = currentOrder.value.find((d) => d.id === id);
      if (dish) return dish.amount;
    }
    return 0;
  }

  return { currentOrder, currentTotal, addToOrder, decrementAmountById, amountById };
});
