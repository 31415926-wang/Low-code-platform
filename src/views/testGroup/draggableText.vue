<template>
    <div style="display: flex;justify-content: space-around">
        <div style="width:50%">
            <h2>列表 1</h2>
            <draggable v-model="list1"  :sort="false" :group="{ name: 'draggableGroup', pull: 'clone', put: false }">
                <div v-for="(item, index) in list1" :key="item.id" class="list-item">
                    <div style="display: flex;">
                        <div>--{{ index + 1 }}--</div>
                        {{ item.name }}
                    </div>
                </div>
            </draggable>
        </div>

        <div style="width:50%">
            <h2>列表 2</h2>
            <draggable v-model="list2" ghost-class="dragGhost" group="draggableGroup">
                <div v-for="(item) in list2" :key="item.id" class="list-item">
                    {{ item.name }}
                </div>

            </draggable>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

import { VueDraggableNext } from 'vue-draggable-next'

export default defineComponent({
    components: {
        draggable: VueDraggableNext
    },
    data() {
        return {
            list1: [
                { id: 1, name: 'Item 1-1' },
                { id: 2, name: 'Item 1-2' }
                // ...
            ],
            list2: [
                { id: 3, name: 'Item 2-1' },
                { id: 4, name: 'Item 2-2' }
                // ...
            ]
        }
    },
    computed: {
        listData2: {
            get() {
                return this.list2
            },
            set(newV) {
                console.log('set', newV)
            }
        }
    },
    methods: {
    }
})
</script>

<style scoped>
.list-item {
    /* 添加一些样式以便区分 */
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    /* 过渡效果（如果需要） */
    transition: transform 0.3s ease;
}

.dragGhost {
    opacity: .7;
    background-color: rgb(255, 230, 191)
}
</style>
