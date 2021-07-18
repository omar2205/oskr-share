<template>
  <!--
  <van-cell-group inset>
    <van-cell
      >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, molestiae
      nihil ut, rem fuga debitis illum non eum recusandae deserunt minus.
      Laudantium ab ducimus esse aut quibusdam praesentium suscipit!
      Nobis!</van-cell
    >
    <van-cell>
      <a href="https://www.tomshardware.com/news/quantum-computing-cambridge-riverland">https://www.tomshardware.com/news/quantum-computing-cambridge-riverland</a>
    </van-cell>
  </van-cell-group>
  -->
  <van-cell-group
    inset
    v-for="item in s"
    :key="item.id"
    :title="item.title"
  >
    <van-cell>{{ item.text }}</van-cell>
    <van-cell v-if="item.text.startsWith('http')"><a :href="item.text">Go to link</a></van-cell>
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
    qS.forEach((doc) => s.value.push(doc.data()))
  })
})

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
</style>
