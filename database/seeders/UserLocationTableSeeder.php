<?php

namespace Database\Seeders;

use App\Models\Userlocation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserLocationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userlocations = array(
            array('id' => '10', 'user_id' => '2', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '12', 'user_id' => '3', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '14', 'user_id' => '4', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '15', 'user_id' => '5', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '17', 'user_id' => '6', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '18', 'user_id' => '7', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '22', 'user_id' => '8', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '23', 'user_id' => '9', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '24', 'user_id' => '10', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '25', 'user_id' => '11', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '26', 'user_id' => '12', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '27', 'user_id' => '13', 'country_id' => '1', 'state_id' => '3'),

            array('id' => '28', 'user_id' => '21', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '29', 'user_id' => '22', 'country_id' => '8', 'state_id' => '14'),
            array('id' => '30', 'user_id' => '23', 'country_id' => '11', 'state_id' => '19'),
            array('id' => '31', 'user_id' => '24', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '32', 'user_id' => '25', 'country_id' => '9', 'state_id' => '16'),
            array('id' => '33', 'user_id' => '26', 'country_id' => '12', 'state_id' => '20'),
            array('id' => '34', 'user_id' => '27', 'country_id' => '10', 'state_id' => '18'),
            array('id' => '35', 'user_id' => '28', 'country_id' => '9', 'state_id' => '17'),
            array('id' => '36', 'user_id' => '29', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '37', 'user_id' => '30', 'country_id' => '1', 'state_id' => '3'),
            
            array('id' => '38', 'user_id' => '18', 'country_id' => '1', 'state_id' => '7'),
            array('id' => '39', 'user_id' => '19', 'country_id' => '1', 'state_id' => '3'),
            array('id' => '40', 'user_id' => '20', 'country_id' => '1', 'state_id' => '3'),
        );
        Userlocation::insert($userlocations);
    }
}
