<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationOpeningTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $location_opening = array(
            array('id' => '1','opening_id' => '1','country_id' => '1','state_id' => '3'),
            array('id' => '2','opening_id' => '2','country_id' => '8','state_id' => '15'),
            array('id' => '3','opening_id' => '3','country_id' => '9','state_id' => '16'),
            array('id' => '4','opening_id' => '4','country_id' => '9','state_id' => '16'),
            array('id' => '5','opening_id' => '5','country_id' => '9','state_id' => '16'),
            array('id' => '6','opening_id' => '6','country_id' => '9','state_id' => '16'),
            array('id' => '7','opening_id' => '7','country_id' => '9','state_id' => '16'),
            array('id' => '8','opening_id' => '8','country_id' => '9','state_id' => '16'),
            array('id' => '9','opening_id' => '9','country_id' => '9','state_id' => '16'),
            array('id' => '10','opening_id' => '10','country_id' => '9','state_id' => '16'),
            array('id' => '11','opening_id' => '11','country_id' => '9','state_id' => '16'),
            array('id' => '12','opening_id' => '12','country_id' => '9','state_id' => '16'),
            array('id' => '13','opening_id' => '13','country_id' => '9','state_id' => '16'),
            array('id' => '14','opening_id' => '14','country_id' => '9','state_id' => '16')
          );

          DB::table('location_opening')->insert($location_opening);
    }
}
