<script setup lang='ts'>
import { defineProps } from 'vue'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

const props = defineProps({
  title: String,
  type: String,
})

const toast = () => {
  createToast({
      title: props.title ? props.title : 'empty toast' 
    },
    {
      type: props.type ? props.type : undefined,
      position: 'bottom-right'
    }
    )
  }
toast();

</script>

<template>
</template>