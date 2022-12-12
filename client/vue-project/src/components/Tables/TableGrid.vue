<script setup lang="ts">
import { ref, computed } from "vue";
import QRCode from 'qrcode-svg'
import ModalView from "../ModalView.vue";
import tableAPIService from '../../services/tableAPI';
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import QRModal from '../QRModal.vue';
import Toast from "../Toasts/Toast.vue";
import type { EntryTable } from "../../types";

const showToast = ref(false);
const toastTitle = ref("");
const toastType = ref("success");

const props = defineProps({
  data: Array,
  columns: Array,
  filterKey: String,
  userData: Object
});

const sortKey = ref("");
const sortOrders = ref(
  props.columns!.reduce((o: any, key) => ((o[key as string] = 1), o), {})
);
const showModal = ref(false)
const showQRModal = ref(false)
const buttonToDeleteID = ref("");
const targetQRUrl = ref("");
const QRToDownload = ref(null);
const targetQRTableName = ref("");

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
    const order = (sortOrders as any).value[key];
    data = data?.slice().sort((a: any, b: any) => {
      a = a[key];
      b = b[key];
      return (a === b ? 0 : a > b ? 1 : -1) * order;
    });
  }
  return data;
});

function sortBy(key: any) {
  sortKey.value = key;
  (sortOrders as any).value[key] *= -1;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function handleTableDeletion() {
  const res = await tableAPIService.deleteTable(buttonToDeleteID.value, props.userData?.username as string);
  if (res && res.success) {
    showModal.value = false;
    toastTitle.value = "Table deleted!";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
      window.location.reload();
    }, 2000);

  } else {
    toastTitle.value = "Couldn't delete the table :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  };
}

async function handlePinRefresh(tableID: string) {
  const res = await tableAPIService.refreshPin(tableID, props.userData?.username);
  if (res && res.success) {
    toastTitle.value = "Pin refreshed!";
    toastType.value = "success";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
      window.location.reload();
    }, 2000);

  } else {
    toastTitle.value = "Couldn't refresh the pin :(";
    toastType.value = "danger";
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  };
}

function tableToDelete(id: string) {
  showModal.value = true;
  buttonToDeleteID.value = id;
}

function handleQRDownload(tablename: string, QRUrl: string) {
  targetQRTableName.value = tablename;
  targetQRUrl.value = QRUrl
  QRToDownload.value = new QRCode({
    content: QRUrl,
    padding: 0,
    width: 160,
    height: 160,
    color: "#000000",
    background: "#ffffff",
    ecl: "M",
  }).svg();
  showQRModal.value = true;
}

function downloadDocument() {
  const pdfTable = document.getElementById(targetQRTableName.value);
  let html = htmlToPdfmake(pdfTable?.innerHTML);
  const documentDefinition = { content: html };
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.createPdf(documentDefinition).download();
}
</script>

<template>
  <div v-if="showToast">
    <Toast :title="toastTitle" :type="toastType" />
  </div>
  <div>
    <table v-if="filteredData?.length" class="sm:rounded-lg">
      <thead>
        <tr class="overflow-hidden bg-white shadow sm:rounded-lg">
          <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }"
          class="text-sm font-medium text-gray-500">
            {{ capitalize(key as any) }}
            <span class="arrow" :class="(sortOrders as any)[key as number] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredData" >
          <td v-for="key in columns" class="border-y">
          <td v-if="key === 'QR'">
            <div class="flex direction-row">
              <button @click="handleQRDownload((entry as EntryTable).table, (entry as EntryTable)[key])"
                class="bg-transparent text-zinc-500 hover:text-black font-bold py-1 px-3 rounded-lg">
                <font-awesome-icon icon="fa-solid fa-file-arrow-down fa-lg" />
              </button>
            </div>
          </td>
          <td v-else-if="key === 'actions'">
            <button @click="tableToDelete((entry as EntryTable)[key])"
              class="text-zinc-500 hover:text-black  font-bold py-4 px-4 rounded-full">
              <font-awesome-icon icon="fa-solid fa-trash fa-lg" />
            </button>
          </td>
          <td v-else-if="key === 'pincode'" class="text-sm text-gray-900">
            {{ (entry as EntryTable)[key] }}
            <button @click="handlePinRefresh((entry as EntryTable)['actions'])"
              class="bg-transparent p-4 text-zinc-500 hover:text-black">
              <font-awesome-icon icon="fa-solid fa-arrows-rotate fa-lg" class="text-violet-700" />
            </button>
          </td>
          <td v-else class="text-sm text-gray-900"> {{ (entry as any)[key as string] }}</td>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No entries found</p>
  </div>
  <Teleport to="body">
    <ModalView :show="showModal" @submit="handleTableDeletion" @close="showModal = false">
      <template #header>
        <p>Are you sure you want to delete the table?</p>
      </template>
    </ModalView>
  </Teleport>
  <Teleport to="body">
    <QRModal :show="showQRModal" @submit="downloadDocument" @close="showQRModal = false">
      <template #header>
      </template>
      <template #body>
        <div :id="targetQRTableName">
          <div v-html="QRToDownload">
          </div>
          <p>{{ targetQRTableName }}</p>
        </div>
      </template>
    </QRModal>
  </Teleport>
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
