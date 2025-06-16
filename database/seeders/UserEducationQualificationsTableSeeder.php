<?php

namespace Database\Seeders;

use App\Models\UserEducationQualification;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserEducationQualificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_education_qualifications = array(
            array('id' => '28', 'user_id' => '2', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:37:52', 'updated_at' => '2023-10-07 10:37:52'),
            array('id' => '29', 'user_id' => '2', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:37:52', 'updated_at' => '2023-10-07 10:37:52'),
            array('id' => '30', 'user_id' => '2', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:37:52', 'updated_at' => '2023-10-07 10:37:52'),
            array('id' => '34', 'user_id' => '3', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:39:38', 'updated_at' => '2023-10-07 10:39:38'),
            array('id' => '35', 'user_id' => '3', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:39:38', 'updated_at' => '2023-10-07 10:39:38'),
            array('id' => '36', 'user_id' => '3', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:39:38', 'updated_at' => '2023-10-07 10:39:38'),
            array('id' => '40', 'user_id' => '4', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:40:45', 'updated_at' => '2023-10-07 10:40:45'),
            array('id' => '41', 'user_id' => '4', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:40:45', 'updated_at' => '2023-10-07 10:40:45'),
            array('id' => '42', 'user_id' => '4', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:40:45', 'updated_at' => '2023-10-07 10:40:45'),
            array('id' => '43', 'user_id' => '5', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:43:03', 'updated_at' => '2023-10-07 10:43:03'),
            array('id' => '44', 'user_id' => '5', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:43:03', 'updated_at' => '2023-10-07 10:43:03'),
            array('id' => '45', 'user_id' => '5', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:43:03', 'updated_at' => '2023-10-07 10:43:03'),
            array('id' => '49', 'user_id' => '6', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '50', 'user_id' => '6', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '51', 'user_id' => '6', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '52', 'user_id' => '7', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:47:38', 'updated_at' => '2023-10-07 10:47:38'),
            array('id' => '53', 'user_id' => '7', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:47:38', 'updated_at' => '2023-10-07 10:47:38'),
            
            array('id' => '54', 'user_id' => '8', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '55', 'user_id' => '8', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '56', 'user_id' => '8', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),

            array('id' => '74', 'user_id' => '9', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '57', 'user_id' => '9', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '58', 'user_id' => '9', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),

            array('id' => '59', 'user_id' => '10', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '60', 'user_id' => '10', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '61', 'user_id' => '10', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),

            array('id' => '62', 'user_id' => '11', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '63', 'user_id' => '11', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '64', 'user_id' => '11', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),

            array('id' => '65', 'user_id' => '12', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '66', 'user_id' => '12', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '67', 'user_id' => '12', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),

            array('id' => '68', 'user_id' => '13', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '69', 'user_id' => '13', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '70', 'user_id' => '13', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),

            array('id' => '71', 'user_id' => '13', 'qualification_id' => '1', 'meta' => '{"institute_name":"ABC School","result":5,"pass_year":2017,"degree":1,"out_of":5,"is_current":false,"start_at":2015}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '72', 'user_id' => '13', 'qualification_id' => '2', 'meta' => '{"institute_name":"Design Collage","result":4,"pass_year":2019,"degree":2,"out_of":5,"is_current":false,"start_at":2017}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
            array('id' => '73', 'user_id' => '13', 'qualification_id' => '3', 'meta' => '{"institute_name":"University of Boston","result":null,"pass_year":null,"degree":3,"out_of":5,"is_current":true,"start_at":2020}', 'created_at' => '2023-10-07 10:46:09', 'updated_at' => '2023-10-07 10:46:09'),
        );
        UserEducationQualification::insert($user_education_qualifications);
    }
}
