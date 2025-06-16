<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfoliosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portfolios = array(
            array('id' => '1', 'title' => 'Item 1', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:33:12', 'updated_at' => '2023-09-17 06:33:12'),
            array('id' => '2', 'title' => 'Item 2', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:33:21', 'updated_at' => '2023-09-17 06:33:21'),
            array('id' => '3', 'title' => 'Item 3', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:33:29', 'updated_at' => '2023-09-17 06:33:29'),
            array('id' => '4', 'title' => 'Item 4', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:34:21', 'updated_at' => '2023-09-17 06:34:21'),
            array('id' => '5', 'title' => 'Item 5', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:34:32', 'updated_at' => '2023-09-17 06:34:32'),
            array('id' => '6', 'title' => 'Item 6', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:34:42', 'updated_at' => '2023-09-17 06:34:42'),
            array('id' => '7', 'title' => 'Item 7', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:34:52', 'updated_at' => '2023-09-17 06:34:52'),
            array('id' => '8', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '2', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19'),
            array('id' => '11', 'title' => 'Item 1', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:33:12', 'updated_at' => '2023-09-17 06:33:12'),
            array('id' => '12', 'title' => 'Item 2', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:33:21', 'updated_at' => '2023-09-17 06:33:21'),
            array('id' => '13', 'title' => 'Item 3', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:33:29', 'updated_at' => '2023-09-17 06:33:29'),
            array('id' => '14', 'title' => 'Item 4', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:34:21', 'updated_at' => '2023-09-17 06:34:21'),
            array('id' => '15', 'title' => 'Item 5', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:34:32', 'updated_at' => '2023-09-17 06:34:32'),
            array('id' => '16', 'title' => 'Item 6', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:34:42', 'updated_at' => '2023-09-17 06:34:42'),
            array('id' => '17', 'title' => 'Item 7', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:34:52', 'updated_at' => '2023-09-17 06:34:52'),
            array('id' => '18', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '3', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19'),
            array('id' => '21', 'title' => 'Item 1', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:33:12', 'updated_at' => '2023-09-17 06:33:12'),
            array('id' => '22', 'title' => 'Item 2', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:33:21', 'updated_at' => '2023-09-17 06:33:21'),
            array('id' => '23', 'title' => 'Item 3', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:33:29', 'updated_at' => '2023-09-17 06:33:29'),
            array('id' => '24', 'title' => 'Item 4', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:34:21', 'updated_at' => '2023-09-17 06:34:21'),
            array('id' => '25', 'title' => 'Item 5', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:34:32', 'updated_at' => '2023-09-17 06:34:32'),
            array('id' => '26', 'title' => 'Item 6', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:34:42', 'updated_at' => '2023-09-17 06:34:42'),
            array('id' => '27', 'title' => 'Item 7', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:34:52', 'updated_at' => '2023-09-17 06:34:52'),
            array('id' => '28', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '4', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19'),
            array('id' => '31', 'title' => 'Item 1', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:33:12', 'updated_at' => '2023-09-17 06:33:12'),
            array('id' => '32', 'title' => 'Item 2', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:33:21', 'updated_at' => '2023-09-17 06:33:21'),
            array('id' => '33', 'title' => 'Item 3', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:33:29', 'updated_at' => '2023-09-17 06:33:29'),
            array('id' => '34', 'title' => 'Item 4', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:34:21', 'updated_at' => '2023-09-17 06:34:21'),
            array('id' => '35', 'title' => 'Item 5', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:34:32', 'updated_at' => '2023-09-17 06:34:32'),
            array('id' => '36', 'title' => 'Item 6', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:34:42', 'updated_at' => '2023-09-17 06:34:42'),
            array('id' => '37', 'title' => 'Item 7', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:34:52', 'updated_at' => '2023-09-17 06:34:52'),
            array('id' => '38', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '5', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19'),
            array('id' => '41', 'title' => 'Item 1', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:33:12', 'updated_at' => '2023-09-17 06:33:12'),
            array('id' => '42', 'title' => 'Item 2', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:33:21', 'updated_at' => '2023-09-17 06:33:21'),
            array('id' => '43', 'title' => 'Item 3', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:33:29', 'updated_at' => '2023-09-17 06:33:29'),
            array('id' => '44', 'title' => 'Item 4', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:34:21', 'updated_at' => '2023-09-17 06:34:21'),
            array('id' => '45', 'title' => 'Item 5', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:34:32', 'updated_at' => '2023-09-17 06:34:32'),
            array('id' => '46', 'title' => 'Item 6', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:34:42', 'updated_at' => '2023-09-17 06:34:42'),
            array('id' => '47', 'title' => 'Item 7', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:34:52', 'updated_at' => '2023-09-17 06:34:52'),
            array('id' => '48', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '6', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19'),
            array('id' => '51', 'title' => 'Item 1', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:33:12', 'updated_at' => '2023-09-17 06:33:12'),
            array('id' => '52', 'title' => 'Item 2', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:33:21', 'updated_at' => '2023-09-17 06:33:21'),
            array('id' => '53', 'title' => 'Item 3', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:33:29', 'updated_at' => '2023-09-17 06:33:29'),
            array('id' => '54', 'title' => 'Item 4', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:34:21', 'updated_at' => '2023-09-17 06:34:21'),
            array('id' => '55', 'title' => 'Item 5', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:34:32', 'updated_at' => '2023-09-17 06:34:32'),
            array('id' => '56', 'title' => 'Item 6', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:34:42', 'updated_at' => '2023-09-17 06:34:42'),
            array('id' => '57', 'title' => 'Item 7', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:34:52', 'updated_at' => '2023-09-17 06:34:52'),
            array('id' => '58', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '7', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19'),
            array('id' => '59', 'title' => '1', 'preview' => '/demo/Lz4c98NPzXyLOFCAiOXh.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:55:15', 'updated_at' => '2023-10-07 10:55:15'),
            array('id' => '60', 'title' => '2', 'preview' => '/demo/PN7CGLEgdvVKPFMbebTN.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:55:21', 'updated_at' => '2023-10-07 10:55:21'),
            array('id' => '61', 'title' => '3', 'preview' => '/demo/69xcje6xwRlI8qkCRwiw.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:55:27', 'updated_at' => '2023-10-07 10:55:27'),
            array('id' => '62', 'title' => '4', 'preview' => '/demo/eiMtptRqu2sye4P4kTKT.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:55:34', 'updated_at' => '2023-10-07 10:55:34'),
            array('id' => '63', 'title' => '5', 'preview' => '/demo/HOW9sNzcIdXY2rl25R65.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:55:41', 'updated_at' => '2023-10-07 10:55:41'),
            array('id' => '64', 'title' => '6', 'preview' => '/demo/KTQSyLdm8PMUKCIqtjrg.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:55:53', 'updated_at' => '2023-10-07 10:55:53'),
            array('id' => '65', 'title' => '7', 'preview' => '/demo/0yctkt4oB2dmOn0BLT4I.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:55:59', 'updated_at' => '2023-10-07 10:55:59'),
            array('id' => '66', 'title' => '8', 'preview' => '/demo/yisKgLCCXYq0kZnxFq6y.jpg', 'user_id' => '8', 'created_at' => '2023-10-07 10:56:06', 'updated_at' => '2023-10-07 10:56:06'),
            array('id' => '67', 'title' => 'Item 2', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:33:21', 'updated_at' => '2023-09-17 06:33:21'),
            array('id' => '68', 'title' => 'Item 3', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:33:29', 'updated_at' => '2023-09-17 06:33:29'),
            array('id' => '69', 'title' => 'Item 4', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:34:21', 'updated_at' => '2023-09-17 06:34:21'),
            array('id' => '70', 'title' => 'Item 5', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:34:32', 'updated_at' => '2023-09-17 06:34:32'),
            array('id' => '71', 'title' => 'Item 6', 'preview' => '/assets/images/candidates/CP_03.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:34:42', 'updated_at' => '2023-09-17 06:34:42'),
            array('id' => '72', 'title' => 'Item 7', 'preview' => '/assets/images/candidates/CP_01.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:34:52', 'updated_at' => '2023-09-17 06:34:52'),
            array('id' => '73', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19'),
            array('id' => '74', 'title' => 'Item 8', 'preview' => '/assets/images/candidates/CP_02.jpg', 'user_id' => '9', 'created_at' => '2023-09-17 06:37:19', 'updated_at' => '2023-09-17 06:37:19')
        );

        Portfolio::insert($portfolios);
    }
}
