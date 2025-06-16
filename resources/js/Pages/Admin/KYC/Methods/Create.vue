<script setup>
import notify from "@/Plugins/Admin/notify"
import AdminLayout from "@/Layouts/Admin.vue"
import { useForm } from "@inertiajs/vue3"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import InputFieldError from "@/Components/InputFieldError.vue"
defineOptions({ layout: AdminLayout })

defineProps(['types', 'segments', 'buttons'])

const form = useForm({
    image: '',
    title: '',
    status: 1,
    image_accept: 1,
    fields: [
        {
            label: '',
            type: 'text',
        }
    ]
})

const submit = () => {
    form.post(route('admin.kyc-methods.store'), {
        onSuccess: () => {
            notify.success('Method has been added successfully')
        }
    })
}

const addItem = () => {
    form.fields.push({
        label: '',
        type: 'text',
    })
}

const removeItem = (index) => {
    form.fields.splice(index, 1)
}

</script>

<template>
    <main class="container p-4 sm:p-6">
        <HeaderSegment :title="trans('KYC Methods Create')" :segments="segments" :buttons="buttons" />
        <form @submit.prevent="submit">
            <div class="grid grid-cols-1 lg:grid-cols-2 space-x-5">

                <div class="col-1">
                    <div class="card">
                        <div class="card-body">
                            <div class="mb-2">
                                <label for="image" class="required">{{ trans('Image') }}</label>
                                <input type="file" @change="e => form.image = e.target.files[0]" class="input">
                                <InputFieldError :message="form.errors.image" />
                            </div>
                            <div class="mb-2">
                                <label for="title" class="required">{{ trans('Title') }}</label>
                                <input type="text" v-model="form.title" id="title" class="input"
                                    :placeholder="trans('Enter Title')">
                                <InputFieldError :message="form.errors.title" />
                            </div>
                            <div class="mb-2">
                                <label for="image_accept" class="required">{{ trans('Accept Attachments') }}</label>
                                <select v-model="form.image_accept" id="image_accept" class="select" data-control="select2"
                                    required>
                                    <option value="1">{{ trans('Yes') }}</option>
                                    <option value="0">{{ trans('No') }}</option>
                                </select>
                            </div>
                            <div class="mb-2">
                                <label for="status" class="required">{{ trans('Status:') }}</label>
                                <select v-model="form.status" id="status" class="select" data-control="select2" required>
                                    <option value="1">{{ trans('Active') }}</option>
                                    <option value="0">{{ trans('Inactive') }}</option>
                                </select>
                            </div>
                            <SpinnerBtn classes="btn btn-primary" :processing="form.processing" btn-text="Save Method" />
                        </div>
                    </div>
                </div>

                <div class="col-1">
                    <div class="card">
                        <div class="card-header ">
                            <div class="flex justify-between">
                                <h4>{{ trans('Document Fields') }}</h4>
                                <button type="button" class="btn btn-primary" @click="addItem">
                                    <i class="fas fa-plus-circle"></i>
                                </button>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="mb-2">
                                <div class="input-group mb-5" v-for="(field, index) in form.fields" :key="field">

                                    <input type="text" v-model="field.label" class="input"
                                        :placeholder="trans('Enter input label')" aria-label="" required>
                                    <select v-model="field.type" class="input" required>
                                        <option v-for="item in types" :key="item" :value="item">{{ item }}</option>
                                       
                                    </select>

                                    <button type="button" class="btn btn-danger" @click="removeItem(index)">
                                        <i class="fas fa-times-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </form>
    </main>
</template>