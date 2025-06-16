<?php

namespace Database\Seeders;

use App\Models\Usercategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $usercategories = array(
            array('user_id' => '2', 'category_id' => '41'),
            array('user_id' => '2', 'category_id' => '42'),
            array('user_id' => '2', 'category_id' => '43'),
           
            array('user_id' => '3', 'category_id' => '48'),
            array('user_id' => '3', 'category_id' => '49'),
            array('user_id' => '3', 'category_id' => '50'),
          
            array('user_id' => '4', 'category_id' => '44'),
            array('user_id' => '4', 'category_id' => '45'),
            array('user_id' => '4', 'category_id' => '46'),
           
            array('user_id' => '5', 'category_id' => '48'),
            array('user_id' => '5', 'category_id' => '49'),
            array('user_id' => '5', 'category_id' => '50'),
          
            array('user_id' => '6', 'category_id' => '26'),
            array('user_id' => '6', 'category_id' => '44'),
            array('user_id' => '6', 'category_id' => '46'),
          
            array('user_id' => '7', 'category_id' => '41'),
            array('user_id' => '7', 'category_id' => '42'),
            array('user_id' => '7', 'category_id' => '52'),

            array('user_id' => '8', 'category_id' => '42'),
            array('user_id' => '8', 'category_id' => '43'),
            array('user_id' => '8', 'category_id' => '52'),
            
            array('user_id' => '9', 'category_id' => '48'),
            array('user_id' => '9', 'category_id' => '49'),
            array('user_id' => '9', 'category_id' => '50'),
            
            array('user_id' => '10', 'category_id' => '48'),
            array('user_id' => '10', 'category_id' => '49'),
            array('user_id' => '10', 'category_id' => '50'),
            
            array('user_id' => '11', 'category_id' => '48'),
            array('user_id' => '11', 'category_id' => '49'),
            array('user_id' => '11', 'category_id' => '50'),
            
            array('user_id' => '12', 'category_id' => '48'),
            array('user_id' => '12', 'category_id' => '49'),
            array('user_id' => '12', 'category_id' => '50'),

            array('user_id' => '13', 'category_id' => '48'),
            array('user_id' => '13', 'category_id' => '49'),
            array('user_id' => '13', 'category_id' => '50'),

            array('user_id' => '18', 'category_id' => '33'),
            array('user_id' => '18', 'category_id' => '35'),
            array('user_id' => '18', 'category_id' => '25'),
            array('user_id' => '18', 'category_id' => '24'),
            array('user_id' => '18', 'category_id' => '32'),
            array('user_id' => '19', 'category_id' => '32'),
            array('user_id' => '20', 'category_id' => '32'),
            array('user_id' => '21', 'category_id' => '32'),
            array('user_id' => '22', 'category_id' => '32'),
            array('user_id' => '23', 'category_id' => '32'),
            array('user_id' => '24', 'category_id' => '32'),
            array('user_id' => '25', 'category_id' => '32'),
            array('user_id' => '26', 'category_id' => '32'),
            array('user_id' => '27', 'category_id' => '32'),
            array('user_id' => '28', 'category_id' => '32'),
            array('user_id' => '29', 'category_id' => '32'),
            array('user_id' => '30', 'category_id' => '32')
        );
        Usercategory::insert($usercategories);
    }
}
