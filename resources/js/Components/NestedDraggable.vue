<template>
  <draggable
    class="dragArea"
    tag="ul"
    :list="tasks"
    :group="{ name: 'g' }"
    item-key="text"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element }">
      <li>
        <div class="flex items-center justify-between rounded border p-2">
          <p>
            <i class="fa fa-arrows-alt" aria-hidden="true"></i>
            {{ element.text }}
          </p>
          <div>
            <button class="btn" @click="edit(element.id)">
              <i class="fas fa-pen"></i>
            </button>
            <button class="btn" @click="remove(element.id)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <nested-draggable :tasks="element.children" />
      </li>
    </template>
  </draggable>
</template>

<script setup>
import draggable from 'vuedraggable'
import { menu } from '@/composables/menuComposable'
import { ref } from 'vue'
defineProps({
  tasks: {
    required: true
  }
})
const dragging = ref(false)
const remove = (id) => {
  menu.contentId = id
  menu.removeItem()
}
const edit = (id) => {
  menu.contentId = id
  menu.editItem()
}
</script>

<style scoped>
.dragArea:first-child {
  padding-left: 0px;
}

.dragArea {
  margin-top: 10px;
  min-height: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
}

.dragArea li {
  list-style: none;
  cursor: move;
}
</style>
