
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
const props = defineProps(['segments', 'buttons', 'id',
 'KYC_MUST_VERIFIED',
 'EMAIL_MUST_VERIFIED'
])

const form = useForm({
    KYC_MUST_VERIFIED: props.KYC_MUST_VERIFIED,
    EMAIL_MUST_VERIFIED: props.EMAIL_MUST_VERIFIED,
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
        <HeaderSegment :title="trans('Verification Settings')" :segments="segments" :buttons="buttons" />
        <div class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-12">
                <div class="lg:col-span-5">
                    <strong>{{ trans('Verification Settings') }}</strong>
                    <p>{{ trans('Edit you application user verification settings') }}</p>
                </div>
                <div class="lg:col-span-7">
                    <form @submit.prevent="update">
                        <div class="card">
                            <div class="card-body">
                                <div class="mb-2">
                                    <label class="label">{{ trans('KYC Verification') }}</label>
                                    <select class="select" v-model="form.KYC_MUST_VERIFIED">
                                    <option value="true">{{ trans('Enable') }}</option>
                                    <option value="false">{{ trans('Disable') }}</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label class="label">{{ trans('Email Verification') }}</label>
                                    <select class="select" v-model="form.EMAIL_MUST_VERIFIED">
                                    <option value="true">{{ trans('Enable') }}</option>
                                    <option value="false">{{ trans('Disable') }}</option>
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
