<template>
  <v-table class="list-table">
    <thead>
      <tr >
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in items" :key="rowIndex" @click="emit('row-click', row)">
        <td v-for="(value, key, colIndex) in row" :key="colIndex">
          <slot :name="key" :value="value" :item="row">
            {{ value }}
          </slot>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['row-click']) // 클릭 이벤트 정의

defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

</script>

<style scoped>
.list-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* 모든 th는 센터 정렬 */
th {
  background-color: #f4f4f4;
  font-weight: 600;
  text-align: center !important;
  padding: 14px;
  border-bottom: 1px solid #e0e0e0;
}

/* 기본 td는 센터 정렬 */
td {
  text-align: center;
  padding: 14px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

/* 제목 컬럼의 td만 왼쪽 정렬 (제목은 두 번째 컬럼) */
td:nth-child(2) {
  text-align: left;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}
.clickable-row:hover {
  background-color: #f5f5f5;
}


</style>
