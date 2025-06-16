<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryOpeningTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $category_opening = array(
            array('opening_id' => '1','category_id' => '42'),
            array('opening_id' => '1','category_id' => '47'),
            array('opening_id' => '1','category_id' => '52'),
            array('opening_id' => '1','category_id' => '41'),
            array('opening_id' => '1','category_id' => '43'),
            array('opening_id' => '1','category_id' => '28'),
            array('opening_id' => '1','category_id' => '24'),
            array('opening_id' => '2','category_id' => '28'),
            array('opening_id' => '2','category_id' => '42'),
            array('opening_id' => '2','category_id' => '47'),
            array('opening_id' => '2','category_id' => '24'),
            array('opening_id' => '3','category_id' => '39'),
            array('opening_id' => '3','category_id' => '45'),
            array('opening_id' => '3','category_id' => '26'),
            array('opening_id' => '3','category_id' => '25'),
            array('opening_id' => '4','category_id' => '39'),
            array('opening_id' => '4','category_id' => '45'),
            array('opening_id' => '4','category_id' => '26'),
            array('opening_id' => '4','category_id' => '25'),
            array('opening_id' => '5','category_id' => '39'),
            array('opening_id' => '5','category_id' => '45'),
            array('opening_id' => '5','category_id' => '26'),
            array('opening_id' => '5','category_id' => '25'),
            array('opening_id' => '7','category_id' => '39'),
            array('opening_id' => '7','category_id' => '45'),
            array('opening_id' => '7','category_id' => '26'),
            array('opening_id' => '7','category_id' => '25'),
            array('opening_id' => '8','category_id' => '39'),
            array('opening_id' => '8','category_id' => '45'),
            array('opening_id' => '8','category_id' => '26'),
            array('opening_id' => '8','category_id' => '25'),
            array('opening_id' => '9','category_id' => '39'),
            array('opening_id' => '9','category_id' => '45'),
            array('opening_id' => '9','category_id' => '26'),
            array('opening_id' => '9','category_id' => '25'),
            array('opening_id' => '10','category_id' => '39'),
            array('opening_id' => '10','category_id' => '45'),
            array('opening_id' => '10','category_id' => '26'),
            array('opening_id' => '10','category_id' => '25'),
            array('opening_id' => '11','category_id' => '39'),
            array('opening_id' => '11','category_id' => '45'),
            array('opening_id' => '11','category_id' => '26'),
            array('opening_id' => '11','category_id' => '25'),
            array('opening_id' => '12','category_id' => '39'),
            array('opening_id' => '12','category_id' => '45'),
            array('opening_id' => '12','category_id' => '26'),
            array('opening_id' => '12','category_id' => '25'),
            array('opening_id' => '13','category_id' => '39'),
            array('opening_id' => '13','category_id' => '45'),
            array('opening_id' => '13','category_id' => '26'),
            array('opening_id' => '13','category_id' => '25'),
            array('opening_id' => '14','category_id' => '39'),
            array('opening_id' => '14','category_id' => '45'),
            array('opening_id' => '14','category_id' => '26'),
            array('opening_id' => '14','category_id' => '25'),
            array('opening_id' => '6','category_id' => '49'),
            array('opening_id' => '6','category_id' => '50'),
            array('opening_id' => '6','category_id' => '48'),
            array('opening_id' => '6','category_id' => '35'),
            array('opening_id' => '15','category_id' => '48'),
            array('opening_id' => '15','category_id' => '49'),
            array('opening_id' => '15','category_id' => '50'),
            array('opening_id' => '15','category_id' => '35'),
            array('opening_id' => '16','category_id' => '56'),
            array('opening_id' => '16','category_id' => '57'),
            array('opening_id' => '16','category_id' => '34'),
            array('opening_id' => '17','category_id' => '29'),
            array('opening_id' => '17','category_id' => '51'),
            array('opening_id' => '17','category_id' => '32'),
            array('opening_id' => '18','category_id' => '58'),
            array('opening_id' => '18','category_id' => '59'),
            array('opening_id' => '18','category_id' => '33')
          );
        DB::table('category_opening')->insert($category_opening);
    }
}
