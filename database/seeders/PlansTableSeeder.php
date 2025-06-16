<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans = array(
            array('id' => '1', 'title' => 'Starter', 'price' => '10', 'is_featured' => '1', 'is_recommended' => '0', 'is_default' => 1, 'is_trial' => '0', 'status' => '1', 'days' => '30', 'trial_days' => '0', 'data' => '{"job_limit":10,"featured_jobs":5,"live_job_for_days":60,"ai_credits":1000}', 'created_at' => '2023-10-05 18:29:25', 'updated_at' => '2023-10-05 18:31:25'),

            array('id' => '2', 'title' => 'Enterprise', 'price' => '50', 'is_featured' => '1', 'is_recommended' => '1', 'is_default' => 0, 'is_trial' => '1', 'status' => '1', 'days' => '30', 'trial_days' => '10', 'data' => '{"job_limit":20,"featured_jobs":10,"live_job_for_days":90,"ai_credits":1000}', 'created_at' => '2023-10-05 18:30:39', 'updated_at' => '2023-10-05 18:33:59'),

            array('id' => '3', 'title' => 'Basic', 'price' => '20', 'is_featured' => '1', 'is_recommended' => '0', 'is_default' => 0, 'is_trial' => '0', 'status' => '1', 'days' => '30', 'trial_days' => '0', 'data' => '{"job_limit":20,"featured_jobs":15,"live_job_for_days":120,"ai_credits":1000}', 'created_at' => '2023-10-05 18:32:49', 'updated_at' => '2023-10-05 18:32:49')
        );

        Plan::insert($plans);
    }
}
