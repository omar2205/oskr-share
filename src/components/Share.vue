<template>
    <van-row justify="center" align="center">
        <van-col span="12">
            <h3>Share</h3>
            <div class="center">
                <van-loading />
            </div>
            <br />
            <h4 v-if="props.query.title">{{ props.query.title }}</h4>
        </van-col>
    </van-row>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { Toast, Loading } from 'vant'
import db from '../db.js'

const props = defineProps({
    query: Object,
})

const router = useRouter()

onMounted(async () => {
    window.location.replace('/')
    const q = query(
        collection(db, 'oskr-share'),
        where('text', '==', props.query.text)
    )
    const check = await getDocs(q)
    if (check.docs.length > 0) {
        Toast({ message: 'Already exists', icon: 'good-job-o' })
        return
    }
    try {
        const docRef = await addDoc(collection(db, 'oskr-share'), {
            text: props.query.text || 'null',
            title: props.query.title || 'null',
            url: props.query.url || 'null',
            created_at: new Date(),
        })
        router.push('/')
    } catch (err) {
        console.log(err)
        Toast.fail('err')
        router.push('/')
    }
})
</script>

<style>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<style scoped>
pre {
    white-space: pre-wrap;
}
</style>>
