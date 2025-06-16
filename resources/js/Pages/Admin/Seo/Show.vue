
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
import { Head, useForm, router } from '@inertiajs/vue3'
import trans from '@/Composables/transComposable'
const props = defineProps(['segments', 'buttons', 'id', 'contents'])

const form = useForm({
	_method: 'patch',
	metadata: props.contents,
	image: '',
})


const update = () => {
	const url = route('admin.seo.update', props.id)
	form.post(url, {
		onSuccess: () => {
			notify.success('SEO Metadata updated successfully')
		}
	})
}

</script>

<template>
	<main class="container flex-grow p-4 sm:p-6">

		<Head title="Edit SEO Settings" />
		<HeaderSegment :title="trans('Edit SEO Settings')" :segments="segments" :buttons="buttons" />
		<div class="space-y-6">
			<form @submit.prevent="update" enctype="multipart/form-data">

				<div class="grid grid-cols-12">
					<div class="lg:col-span-5">
						<strong>{{ trans('Edit page seo settings') }}</strong>
						<p>{{ trans('Edit page seo and necessary information from here') }}</p>
					</div>
					<div class="lg:col-span-7">
						<!-- Alerts -->
						<div class="card">
							<div class="card-header">
								<h3 class="mb-0">{{ trans('Edit Settings') }}</h3>
							</div>
							<div class="card-body">
								<div class="mb-2">
									<label>{{ trans('Meta Title') }}</label>
									<input type="text" v-model="form.metadata['site_name']" class="input">
								</div>
								<div class="mb-2">
									<label>{{ trans('Meta Description') }}</label>
									<textarea v-model="form.metadata['matadescription']" 
										class="summernote input h-200"></textarea>
								</div>
								<div class="mb-2">
									<label>{{ trans('Meta Tags') }}</label>
									<input type="text" v-model="form.metadata['matatag']" class="input">
								</div>

								<div class="mb-2">
									<label>{{ trans('Twitter Site Title') }}</label>
									<input type="text" v-model="form.metadata['twitter_site_title']" class="input">
								</div>

								<div class="mb-2">
									<label>{{ trans('Meta Image') }}</label>
									<input @input="(e) => (form.image = e.target.files[0])
										" type="file" accept="image/*" class="input">
								</div>
								<div class="mt-3 from-group row">
									<div class="col-lg-12">
										<SpinnerBtn :processing="form.processing" :btn-text="trans('Save Changes')" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>
