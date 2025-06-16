<?php

namespace Database\Seeders;

use App\Models\Qualification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QualificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $qualifications = array(
            array('id' => '1','title' => 'SSC','gpa' => '5','created_at' => '2023-08-23 16:38:17','updated_at' => '2023-08-23 16:38:17'),
            array('id' => '2','title' => 'HSC','gpa' => '5','created_at' => '2023-08-23 16:38:27','updated_at' => '2023-08-23 16:38:27'),
            array('id' => '3','title' => 'Master Degree','gpa' => '4','created_at' => '2023-08-23 16:38:34','updated_at' => '2023-08-23 16:38:34'),
            array('id' => '4','title' => 'BSC','gpa' => '4','created_at' => '2023-08-23 16:38:42','updated_at' => '2023-08-23 16:38:42')
          );
          Qualification::insert($qualifications);
    }
}
