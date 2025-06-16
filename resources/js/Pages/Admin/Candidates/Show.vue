
<script setup>
import AdminLayout from "@/Layouts/Admin.vue"
import HeaderSegment from "@/Layouts/Admin/HeaderSegment.vue"
import SpinnerBtn from "@/Components/Admin/SpinnerBtn.vue"
import trans from '@/Composables/transComposable'
import Overview from "@/Components/Admin/OverviewGrid.vue"
import moment from "moment";
import NoDataFound from "@/Components/Admin/NoDataFound.vue"

defineOptions({ layout: AdminLayout })
const props = defineProps([
	'candidate',
	'appliedJobs',
	'buttons',
	'segments',
	'total_visitors',
	'total_shortlisted',
	'total_bookmarks',
	'total_applied_jobs',
])


const candidateStats = [
	{ value: props.total_visitors, title: trans('Visits'), iconClass: 'bx bx-box' },
	{ value: props.total_shortlisted, title: trans('Shortlisted'), iconClass: 'bx bx-dollar-circle' },
	{ value: props.total_bookmarks, title: trans('Bookmarks'), iconClass: 'ti ti-thumb-up' },
	{ value: props.total_applied_jobs, title: trans('Applied Jobs'), iconClass: 'ti ti-thumb-up' },
]

</script>

<template>
	<main class="container flex-grow p-4 sm:p-6">
		<HeaderSegment title="Candidate details" :segments="segments" :buttons="buttons" />
		<div class="space-y-6">


			<Overview :items="candidateStats" />

			<!-- User Profile Start  -->
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
				<!-- Left Section Start  -->
				<section class="col-span-1 flex h-min w-full flex-col gap-6 lg:sticky lg:top-20">
					<!-- User Avatar & Status  -->
					<div class="card">
						<div class="card-body flex flex-col items-center">
							<div class="relative my-2 h-24 w-24 rounded-full">
								<img :src="candidate.avatar" onerror="this.src = '/images/avatar1.png'" alt="avatar-img"
									class="h-full w-full rounded-full" />
							</div>
							<div>

								<h2 class="text-[16px] font-medium text-slate-700 dark:text-slate-200 mb-4">{{
									candidate.name
								}}</h2>
								<span class="description">{{ trans('Status') }}: </span>
								<span
									:class="candidate.status == 1 ? 'badge badge-success badge-sm' : 'badge badge-danger badge-sm'"><small>{{
										candidate.status == 1 ? 'Active' : 'Suspended' }}</small></span>
							</div>

							<div class="text-center">
								<div class="">
									<i class="mr-2"></i>{{ trans('Join Date: ') }}
									{{ candidate.created_at_date }}

								</div>
							</div>
						</div>
					</div>


				</section>
				<!-- Left Section End  -->
				<!-- Right Section Start  -->
				<section class="col-span-3">
					<div class="flex gap-4 h-full flex-wrap">
						<div class="flex-grow">
							<div class="card h-full">
								<div class="card-body">
									<small class="text-muted font-bold">{{ trans('Bio') }}</small>
									<p>{{ trans('Name : ') }} {{ candidate.name }}</p>
									<p>{{ trans('Email : ') }} {{ candidate.email }}</p>
									<p>{{ trans('Phone : ') }} {{ candidate.phone }}</p>
									<p>{{ trans('Address : ') }} {{ candidate.address }}</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<!-- Right Section End -->
			</div>

			<div>
				<h5 class="mb-2">{{ trans('Applied Jobs') }}</h5>
				<div class="table-responsive whitespace-nowrap rounded-primary">
					<table class="table">
						<thead>
							<tr>
								<th class="w-[5%] uppercase">{{ trans('Title') }}</th>
								<th class="w-[10%] uppercase">{{ trans('Status') }}</th>
								<th class="w-[15%] uppercase">{{ trans('Job Created') }}</th>
								<th class="w-[5%] !text-right uppercase">{{ trans('Actions') }}</th>
							</tr>
						</thead>

						<tbody v-if="appliedJobs.total">
							<tr v-for="job in appliedJobs.data" :key="job.id">
								<td>
									<div class="job-name fw-500">
										{{ job.title }}
									</div>
									<div class="info1">
										{{ job.type.replace("_", " ") }} .
										{{ job.country?.[0]?.name }}
									</div>
								</td>
								<td>
									{{ job.status == 1 ? trans("Active") : trans("Inactive") }}
								</td>
								<td>{{ moment(job.created_at).format("D-MMM-Y") }}</td>
								<td>
									<div class="dropdown" data-placement="bottom-end">
										<div class="dropdown-toggle">
											<i class="w-6 text-slate-400" data-feather="more-horizontal"></i>
										</div>
										<div class="dropdown-content w-40">
											<ul class="dropdown-list">
												<li class="dropdown-list-item">
													<button @click="openEditJobDrawer(job)" class="dropdown-link">
														<i class="h-5 text-slate-400" data-feather="edit"></i>
														<span>{{ trans('Edit') }}</span>
													</button>
												</li>
												<li class="dropdown-list-item">
													<Link :href="route('admin.job.show', job.id)" class="dropdown-link">
													<i class="h-5 text-slate-400" data-feather="eye"></i>
													<span>{{ trans('View') }}</span>
													</Link>
												</li>

												<li class="dropdown-list-item">
													<button as="button" class="dropdown-link"
														@click="deleteRow(route('admin.job.destroy', job.id))">
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
						<NoDataFound v-else for-table="true" />

					</table>

				</div>
			</div>

		</div>
	</main>
</template>
