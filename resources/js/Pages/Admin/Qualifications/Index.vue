
<script setup>
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import { useForm } from "@inertiajs/vue3"
import sharedComposable from "@/Composables/sharedComposable"
import notify from "@/Plugins/Admin/notify"
import drawer from "@/Plugins/Admin/drawer"
import trans from '@/Composables/transComposable'
import { onMounted, ref } from "vue"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import AdminLayout from "@/Layouts/Admin.vue"

defineOptions({ layout: AdminLayout })

const { deleteRow } = sharedComposable()


onMounted(() => {
    drawer.init()
})


const props = defineProps([
    'qualifications',
    'buttons',
    'segments',
])

const form = useForm({
    title: '',
    gpa: '',
})

const editingItem = ref({})
const editForm = useForm({
    title: '',
    gpa: '',
})

const storeQualification = () => {
    form.post(route('admin.qualifications.store'), {
        onSuccess: () => {
            form.reset()
            notify.success(trans('Qualification has been added successfully'))
            drawer.of('#addNewQualificationDrawer').hide()
        }
    })
}

const setEditDrawerForm = (qualification) => {
    editingItem.value = qualification
    editForm.title = qualification.title
    editForm.gpa = qualification.gpa
}

const updateQualification = () => {
    let updateRoute = route('admin.qualifications.update', editingItem.value)
    editForm.put(updateRoute, {
        onSuccess: () => {
            form.reset()
            notify.success(trans('Qualification has been updated successfully'))
            drawer.of('#editQualificationDrawer').hide()
        }
    })
}
</script>


<template>
    <main class="container flex-grow p-4 sm:p-6">
        <HeaderSegment title="Educational Qualification" :segments="segments" :buttons="buttons" />
        <div class="space-y-6">
            <div class="table-responsive whitespace-nowrap rounded-primary">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="col-2">{{ trans("Title") }}</th>
                            <th class="col-2">{{ trans("GPA") }}</th>
                            <th class="flex justify-end col-8">{{ trans("Action") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(qualification, key) in qualifications" :key="key">
                            <td>
                                {{ qualification.title }}
                            </td>
                            <td>
                                {{ qualification.gpa }}
                            </td>
                            <td class="flex justify-end">
                                <div class="dropdown" data-placement="bottom-start">
                                    <div class="dropdown-toggle">
                                        <i class="text-slate-400" data-feather="more-horizontal"></i>
                                    </div>
                                    <div class="w-40 dropdown-content">
                                        <ul class="dropdown-list">
                                            <li class="dropdown-list-item">
                                                <button data-toggle="drawer" data-target="#editQualificationDrawer"
                                                    @click="setEditDrawerForm(qualification)" class="dropdown-link">
                                                    <i class="h-5 text-slate-400" data-feather="edit"></i>
                                                    <span>{{ trans('Edit') }}</span>
                                                </button>
                                            </li>
                                            <li class="dropdown-list-item">
                                                <button
                                                    @click="deleteRow(route('admin.qualifications.destroy', qualification))"
                                                    class="dropdown-link">
                                                    <i class="h-5 text-slate-400" data-feather="trash-2"></i>
                                                    <span>{{ trans('Delete') }}</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </main>



    <div id="addNewQualificationDrawer" class="drawer drawer-right">
        <form @submit.prevent="storeQualification()">
            <div class="drawer-header">
                <h5>{{ trans("Add New Qualification") }}</h5>
                <button type="button"
                    class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                    data-dismiss="drawer">
                    <i data-feather="x" width="1.5rem" height="1.5rem"></i>
                </button>
            </div>
            <div class="drawer-body">
                <div class="mb-2">
                    <label>{{ trans("Title") }}</label>
                    <input v-model="form.title" type="text" class="input" required placeholder="Master Degree" />
                </div>
                <div class="mb-2">
                    <label>{{ trans("GPA Point") }}</label>
                    <input v-model="form.gpa" type="number" class="input" required placeholder="4 or 5" />
                </div>
            </div>
            <div class="drawer-footer">
                <div class="flex justify-end gap-2">
                    <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
                        <span> {{ trans("Close") }}</span>
                    </button>
                    <SpinnerBtn classes="btn w-full btn-primary" :processing="form.processing" :btn-text="trans('Create')" />
                </div>
            </div>
        </form>
    </div>

    <div id="editQualificationDrawer" class="drawer drawer-right">
        <form @submit.prevent="updateQualification()">
            <div class="drawer-header">
                <h5>{{ trans("Edit Qualification") }}</h5>
                <button type="button"
                    class="btn btn-plain-secondary dark:text-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                    data-dismiss="drawer">
                    <i data-feather="x" width="1.5rem" height="1.5rem"></i>
                </button>
            </div>
            <div class="drawer-body">
                <div class="mb-2">
                    <label>{{ trans("Title") }}</label>
                    <input v-model="editForm.title" type="text" class="input" required placeholder="Master Degree" />
                </div>
                <div class="mb-2">
                    <label>{{ trans("GPA Point") }}</label>
                    <input v-model="editForm.gpa" type="number" class="input" required placeholder="4 or 5" />
                </div>
            </div>
            <div class="drawer-footer">
                <div class="flex justify-end gap-2">
                    <button type="button" class="w-full btn btn-secondary" data-dismiss="drawer">
                        <span> {{ trans("Close") }}</span>
                    </button>
                    <SpinnerBtn classes="w-full btn btn-primary" :processing="editForm.processing" :btn-text="trans('Update')" />
                </div>
            </div>
        </form>
    </div>
</template>
