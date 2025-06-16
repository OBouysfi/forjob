<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $posts = array(
            array('id' => '1','title' => 'Do you recommend Pay as you go or Pre pay?','slug' => 'do-you-recommend-pay-as-you-go-or-pre-pay','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 10:17:03','updated_at' => '2024-01-09 15:59:29'),
            array('id' => '2','title' => 'What do I get for $0 with my plan?','slug' => 'what-do-i-get-for-0-with-my-plan','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 10:17:50','updated_at' => '2024-01-09 15:59:00'),
            array('id' => '3','title' => 'Do you offer a 30 day money-back guarantee?','slug' => 'do-you-offer-a-30-day-money-back-guarantee','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 10:18:16','updated_at' => '2023-03-06 10:18:16'),
            array('id' => '4','title' => 'Darlene Robertson','slug' => 'Product Manager','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:53:17','updated_at' => '2023-03-06 17:53:17'),
            array('id' => '5','title' => 'Bessie Cooper','slug' => 'Vp People','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:54:06','updated_at' => '2023-03-06 17:54:06'),
            array('id' => '6','title' => 'Eleanor Pena','slug' => 'Head of Design','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:54:44','updated_at' => '2023-03-06 17:54:44'),
            array('id' => '7','title' => 'Rhonda Ortiz','slug' => 'Founder & CO','type' => 'team','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 17:55:23','updated_at' => '2023-03-06 17:55:23'),
            array('id' => '8','title' => 'Medieval origins to the digital era, everything there is to know','slug' => 'medieval-origins-to-the-digital-era-everything-there-is-to-know','type' => 'blog','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:50:45','updated_at' => '2024-01-09 15:48:06'),
            array('id' => '9','title' => 'What Is ChatGPT? Everything You Need to Know','slug' => 'what-is-chatgpt-everything-you-need-to-know','type' => 'blog','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 18:57:44','updated_at' => '2024-01-09 15:49:56'),
            array('id' => '10','title' => 'Designer’s Checklist for Every UX/UI Project','slug' => 'designers-checklist-for-every-uxui-project','type' => 'blog','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 19:00:52','updated_at' => '2024-01-09 15:46:49'),
            array('id' => '12','title' => 'Jhone Doe','slug' => 'Lead Designer','type' => 'testimonial','status' => '1','featured' => '1','lang' => '5','created_at' => '2023-03-06 19:23:24','updated_at' => '2023-10-07 09:10:05'),
            array('id' => '13','title' => 'Mark Joge','slug' => 'Marketing Chief','type' => 'testimonial','status' => '1','featured' => '1','lang' => '4','created_at' => '2023-03-06 19:24:12','updated_at' => '2023-10-07 09:10:12'),
            array('id' => '14','title' => 'Jhone Doe','slug' => 'Lead Designer','type' => 'testimonial','status' => '1','featured' => '1','lang' => '5','created_at' => '2023-03-06 19:24:59','updated_at' => '2023-10-07 09:07:16'),
            array('id' => '15','title' => 'Financial Services','slug' => 'financial-services','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 19:30:09','updated_at' => '2023-03-06 19:30:09'),
            array('id' => '16','title' => 'How do you find different criteria in your process?','slug' => 'how-do-you-find-different-criteria-in-your-process','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 19:31:09','updated_at' => '2024-01-09 15:58:05'),
            array('id' => '17','title' => 'Apply job or hire','slug' => 'apply-job-or-hire','type' => 'feature','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 22:24:43','updated_at' => '2023-10-07 09:25:49'),
            array('id' => '18','title' => 'Complete your profile','slug' => 'complete-your-profile','type' => 'feature','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 23:15:36','updated_at' => '2023-10-07 09:24:57'),
            array('id' => '19','title' => 'Create Account','slug' => 'create-account','type' => 'feature','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-03-06 23:32:24','updated_at' => '2023-10-07 09:24:08'),
            array('id' => '23','title' => 'Automatically sync in real time','slug' => 'automatically-sync-in-real-time','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-04-09 19:39:14','updated_at' => '2024-01-09 15:57:30'),
            array('id' => '24','title' => 'Do I need a credit card to sign up?','slug' => 'do-i-need-a-credit-card-to-sign-up','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-04-09 19:39:50','updated_at' => '2024-01-09 15:57:15'),
            array('id' => '25','title' => 'How does the free trial work?','slug' => 'how-does-the-free-trial-work','type' => 'faq','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-04-09 19:40:59','updated_at' => '2024-01-09 15:56:58'),
            array('id' => '26','title' => 'Terms and conditions','slug' => 'terms-and-conditions','type' => 'page','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-04-09 19:40:59','updated_at' => '2023-04-09 19:40:59'),
            array('id' => '27','title' => 'Privacy Policy','slug' => 'privacy-policy','type' => 'page','status' => '1','featured' => '1','lang' => 'en','created_at' => '2023-10-08 05:55:19','updated_at' => '2023-10-08 05:55:19')
          );
          

     Post::insert($posts);
    }
}
