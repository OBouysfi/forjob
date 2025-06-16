<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $locations = array(
            array('id' => '1', 'name' => 'Barcelona', 'slug' => 'bangladesh', 'meta' => NULL, 'location_id' => NULL, 'created_at' => NULL, 'updated_at' => NULL),
            array('id' => '3', 'name' => 'Spain', 'slug' => 'dhaka', 'meta' => NULL, 'location_id' => '1', 'created_at' => NULL, 'updated_at' => NULL),
            array('id' => '6', 'name' => 'New York', 'slug' => 'new-york', 'meta' => NULL, 'location_id' => NULL, 'created_at' => '2023-10-07 11:50:31', 'updated_at' => '2023-10-07 11:50:31'),
            array('id' => '7', 'name' => 'Washington', 'slug' => 'washington', 'meta' => NULL, 'location_id' => '6', 'created_at' => '2023-10-07 11:50:42', 'updated_at' => '2023-10-07 11:50:42'),
            array('id' => '8', 'name' => 'US', 'slug' => 'us', 'meta' => NULL, 'location_id' => NULL, 'created_at' => '2023-10-07 11:51:25', 'updated_at' => '2023-10-07 11:51:25'),
            array('id' => '9', 'name' => 'UK', 'slug' => 'uk', 'meta' => NULL, 'location_id' => NULL, 'created_at' => '2023-10-07 11:51:29', 'updated_at' => '2023-10-07 11:51:29'),
            array('id' => '10', 'name' => 'UAE', 'slug' => 'uae', 'meta' => NULL, 'location_id' => NULL, 'created_at' => '2023-10-07 11:51:40', 'updated_at' => '2023-10-07 11:51:40'),
            array('id' => '11', 'name' => 'Italy', 'slug' => 'italy', 'meta' => NULL, 'location_id' => NULL, 'created_at' => '2023-10-07 11:51:46', 'updated_at' => '2023-10-07 11:51:46'),
            array('id' => '12', 'name' => 'IN', 'slug' => 'in', 'meta' => NULL, 'location_id' => NULL, 'created_at' => '2023-10-07 11:51:57', 'updated_at' => '2023-10-07 11:51:57'),
            array('id' => '13', 'name' => 'Washington', 'slug' => 'washington', 'meta' => NULL, 'location_id' => '8', 'created_at' => '2023-10-07 11:52:16', 'updated_at' => '2023-10-07 11:52:16'),
            array('id' => '14', 'name' => 'California', 'slug' => 'california', 'meta' => NULL, 'location_id' => '8', 'created_at' => '2023-10-07 11:52:30', 'updated_at' => '2023-10-07 11:52:30'),
            array('id' => '15', 'name' => 'New York', 'slug' => 'new-york', 'meta' => NULL, 'location_id' => '8', 'created_at' => '2023-10-07 11:52:46', 'updated_at' => '2023-10-07 11:52:46'),
            array('id' => '16', 'name' => 'London', 'slug' => 'london', 'meta' => NULL, 'location_id' => '9', 'created_at' => '2023-10-07 11:53:00', 'updated_at' => '2023-10-07 11:53:00'),
            array('id' => '17', 'name' => 'Manchester', 'slug' => 'manchester', 'meta' => NULL, 'location_id' => '9', 'created_at' => '2023-10-07 11:53:14', 'updated_at' => '2023-10-07 11:53:14'),
            array('id' => '18', 'name' => 'Dubai', 'slug' => 'dubai', 'meta' => NULL, 'location_id' => '10', 'created_at' => '2023-10-07 11:53:33', 'updated_at' => '2023-10-07 11:53:33'),
            array('id' => '19', 'name' => 'Milan', 'slug' => 'milan', 'meta' => NULL, 'location_id' => '11', 'created_at' => '2023-10-07 11:53:49', 'updated_at' => '2023-10-07 11:53:49'),
            array('id' => '20', 'name' => 'Bangalore', 'slug' => 'bangalore', 'meta' => NULL, 'location_id' => '12', 'created_at' => '2023-10-07 11:54:12', 'updated_at' => '2023-10-07 11:54:12')
        );
        Location::insert($locations);
    }
}
