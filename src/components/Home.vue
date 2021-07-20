<template>
  <van-cell-group inset v-for="item in s" :key="item.id" :title="item.title">
    <van-cell>{{ item.text }}</van-cell>
    <van-cell value-class="right-value" v-if="item.text.startsWith('http')">
      <a href="#" @click="removeItem(item.id)">Remove</a>
      <a :href="item.text">Go to link</a></van-cell
    >
  </van-cell-group>

  <van-popup
    :show="show"
    round
    closeable
    position="bottom"
    :style="{ height: '70%' }"
    @click-close-icon="toggleShow"
  >
    <van-cell-group inset>
      <h4>Add new item</h4>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="state.text"
            name="Text"
            label="Text"
            placeholder="Text"
            :rules="[{ required: true, message: 'Text is required' }]"
          />
          <van-field
            v-model="state.title"
            name="Title"
            label="Title"
            placeholder="Title"
            :rules="[{ required: true, message: 'Title is required' }]"
          />
          <van-field
            v-model="state.url"
            name="URL"
            label="URL"
            placeholder="URL"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button block color="#7232dd" native-type="submit">
            Submit
          </van-button>
        </div>
      </van-form>
    </van-cell-group>
  </van-popup>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { Toast, List, Popup, Button } from 'vant'
import {
  onSnapshot,
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  deleteDoc,
  where,
} from 'firebase/firestore'
import db from '../db.js'

const props = defineProps({
  showAddItem: Object,
  toggleShowAddItem: Object,
})

const show = ref(props.showAddItem)
const toggleShow = ref(props.toggleShowAddItem)

const state = reactive({
  text: '',
  title: '',
  URL: '',
})
const s = ref([])
onMounted(async () => {
  const q = query(collection(db, 'oskr-share'), orderBy('created_at', 'desc'))
  const unsub = onSnapshot(q, (qS) => {
    s.value = []
    qS.forEach((doc) => s.value.push({...doc.data(), id: doc.id}))
  })
})

const removeItem = async (id) => {
  await deleteDoc(doc(db, 'oskr-share', id))
}

const onSubmit = async (e) => {
  console.log(e)
  try {
    const docRef = await addDoc(collection(db, 'oskr-share'), {
      text: e.Text || 'null',
      title: e.Title || 'null',
      url: e.URL || 'null',
      created_at: new Date(),
    })
  } catch (err) {
    Toast.fail('err')
  }
  state.text = ''
  state.title = ''
  state.URL = ''
  toggleShow.value()
}
</script>

<style>
body {
  background-color: #f7f8fa;
  height: 100vh;
}
.right-value {
  text-align: right;
}
.right-value a:not(:last-child) {
  margin-right: 1rem;
}
</style>
