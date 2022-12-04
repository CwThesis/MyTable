<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  data: Array,
  columns: Array,
  waiters: Array,
});

const sortKey = ref("");
const sortOrders = ref(
  props.columns!.reduce((o, key) => ((o[key] = 1), o), {})
);

const filteredData = computed(() => {
  let { data, filterKey } = props;
  if (filterKey) {
    filterKey = filterKey.toLowerCase();
    data = data?.filter((row: any) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(String(filterKey)) > -1;
      });
    });
  }
  const key = sortKey.value;
  if (key) {
    const order = sortOrders.value[key];
    data = data?.slice().sort((a, b) => {
      a = a[key];
      b = b[key];
      return (a === b ? 0 : a > b ? 1 : -1) * order;
    });
  }
  return data;
});

function sortBy(key: any) {
  sortKey.value = key;
  sortOrders.value[key] *= -1;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

</script>

<template>
  <div>

    <table v-if="filteredData?.length" class="sm:rounded-lg">
      <thead>
        <tr class="overflow-hidden bg-white shadow sm:rounded-lg">
          <th
            v-for="key in columns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
          >
            {{ capitalize(key as any) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData">
          <td v-for="key in columns" class="border-y">
            <td v-if="key === 'orders'">
              <div class ="shadow p-2" v-for="order in entry[key]">
                <div v-for="dish in order.CO">
              <div>{{dish.name}}, {{dish.amount}}</div>
                </div>
            </div>

            </td>
            <td v-else-if="key === 'total'">
              <div v-for="order in entry[key]">
                <div>{{order.CT}}</div>
              </div>
            </td>

            <td v-else-if="key === 'waiter'">
              <div>
                <select :placeholder="entry['waiter']">
                  <option v-for="waiter in waiters" :key="waiter" :value="waiter">
                    {{ waiter }}
                  </option>
                </select>
              </div>
            </td>

            <td v-else> {{ entry[key] }}</td>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else> <font-awesome-icon icon="fa-solid fa-clock" pull="top" shake/>No entries found</p>
  </div>
</template>




<style>
th {
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: rgb(59, 59, 59);
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
