<template>
    <main class="container p-4 sm:p-6">
        <HeaderSegment :title="trans('Dashboard')" :segments="segments" :buttons="buttons" />
        <div class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-12">
                <div class="lg:col-span-5">
                    <strong>{{ trans('Application Settings') }}</strong>
                    <p>{{ trans('Edit you application global settings') }}</p>
                </div>
                <div class="lg:col-span-7">
                    <form @submit.prevent="update">
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-2">
                                    <label class="label">{{ trans('Application Name') }}</label>
                                    <input type="text" name="name" v-model="form.APP_NAME" required="" class="input">
                                </div>

                                <div class="mb-2">
                                    <label class="label">{{ trans('Visibility Of Site Error') }}</label>
                                    <select class="select" name="app_debug" v-model="form.APP_DEBUG">
                                        <option value="true">{{ trans('Enable') }}</option>
                                        <option value="false">{{ trans('Disable') }}</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label class="label">{{ trans('Application Time Zone') }}</label>

                                    <select class="select" name="timezone" v-model="form.TIME_ZONE">

                                        <option v-for="timezone, index in tzlist" :key="index" :value="timezone">{{
                                            timezone
                                        }}</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label class="label">{{ trans('Application Default Language') }}</label>

                                    <select class="select" name="default_lang" v-model="form.DEFAULT_LANG">

                                        <option v-for="langauge, langKey in  languages" :value="langKey">{{ langauge }}
                                        </option>
                                    </select>
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
const props = defineProps(['segments', 'buttons', 'id', 'tzlist', 'languages', 'appName', 'appDebug', 'timeZone', 'default_lang'])

const form = useForm({
    APP_NAME: props.appName,
    APP_DEBUG: props.appDebug,
    TIME_ZONE: props.timeZone,
    DEFAULT_LANG: props.default_lang,
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