<?php

namespace Database\Seeders;

use App\Models\ExpertLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpertLevelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $expert_levels = array(
            array('id' => '1','title' => 'Expert','created_at' => '2023-08-23 16:38:51','updated_at' => '2023-08-23 16:38:51'),
            array('id' => '2','title' => 'Intermediate','created_at' => '2023-08-23 16:39:06','updated_at' => '2023-08-23 16:39:06'),
            array('id' => '3','title' => 'Fresher','created_at' => '2023-08-23 16:39:15','updated_at' => '2023-08-23 16:39:15'),
            array('id' => '4','title' => 'No-Experience','created_at' => '2023-10-07 09:44:59','updated_at' => '2023-10-07 09:44:59'),
            array('id' => '5','title' => 'Internship','created_at' => '2023-10-07 09:45:10','updated_at' => '2023-10-07 09:45:10')
          );

        ExpertLevel::insert($expert_levels);
    }
}
