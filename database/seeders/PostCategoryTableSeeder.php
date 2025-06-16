<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Postcategory;
class PostCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $postcategories = array(
        array('post_id' => '8','category_id' => '7'),
        array('post_id' => '8','category_id' => '13'),
        array('post_id' => '9','category_id' => '7'),
        array('post_id' => '9','category_id' => '8'),
        array('post_id' => '9','category_id' => '12'),
        array('post_id' => '9','category_id' => '13'),
        array('post_id' => '10','category_id' => '13'),
        array('post_id' => '10','category_id' => '14'),
        array('post_id' => '25','category_id' => '61'),
        array('post_id' => '24','category_id' => '63'),
        array('post_id' => '23','category_id' => '62'),
        array('post_id' => '16','category_id' => '65'),
        array('post_id' => '15','category_id' => '62'),
        array('post_id' => '3','category_id' => '64'),
        array('post_id' => '2','category_id' => '62'),
        array('post_id' => '1','category_id' => '61')
      );

        Postcategory::insert($postcategories);

    }
}
