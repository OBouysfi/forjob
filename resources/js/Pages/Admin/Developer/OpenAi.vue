
<script>
import AdminLayout from "@/Layouts/Admin.vue"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import notify from "@/Plugins/Admin/notify"
export default {
    layout: AdminLayout
}

</script>

<script setup>
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import { useForm } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
const props = defineProps(['segments', 'buttons', 'id', 'OPENAI_API_KEY'])

const form = useForm({
    OPENAI_API_KEY: props.OPENAI_API_KEY,
})


function update() {
    const url = route('admin.developer-settings.update', props.id)
    form.put(url, {
        onSuccess: () => {
            notify.success(trans('Settings has been updated successfully'))
        }
    })
}
</script>

<template>
    <main class="container p-4 sm:p-6">
        <HeaderSegment :title="trans('OpenAi Api Settings')" :segments="segments" :buttons="buttons" />
        <div class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-12">
                <div class="lg:col-span-5">
                    <strong>{{ trans('OpenAi Api Settings') }}</strong>
                    <p>{{ trans('Edit you application OpenAi Api settings') }}</p>
                </div>
                <div class="lg:col-span-7">
                    <form @submit.prevent="update">
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-2">
                                    <label class="label">{{ trans('OpenAi Api Key') }}</label>
                                    <input type="text" v-model="form.OPENAI_API_KEY" class="input">
                                </div>

                                <div class="mt-3">
                                    <SpinnerBtn :processing="form.processing" :btn-text="trans('Save Changes')" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
