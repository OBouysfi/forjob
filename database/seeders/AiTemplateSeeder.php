<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AiTemplate;
class AiTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ai_templates = array(
            array('id' => '1','uuid' => '3dbf2a90-a75b-43df-bf2f-598b051dd9cf','title' => 'Resume Updater','description' => 'Revitalize your resume with our Resume Updater - the key to landing your dream job!','preview' => '/uploads/resumeupdater.png','icon' => '/uploads/resumeupdater.png','type' => 'candidate','status' => 'active','fields' => '[{"type":"textarea","name":"Resume","placeholder":"Add Resume Here","value":null},{"type":"textarea","name":"Job description","placeholder":"Add Job description","value":null}]','prompt' => 'Need to update my resume. Current Resume: [Resume] and Job description [Job description]','ai_model' => 'text-davinci-003','created_at' => '2023-12-17 17:26:46','updated_at' => '2023-12-17 17:26:46'),
            array('id' => '2','uuid' => '8d347ce5-2ce8-4890-b27d-68ccbc78c0c4','title' => 'LinkedIn Ads','description' => 'Eye-catching ads that will not only attract the right audience but also drive them to your lead magnet.','preview' => '/uploads/linkedInads.png','icon' => '/uploads/linkedInads.png','type' => 'employer','status' => 'active','fields' => '[{"type":"input","name":"Service Name","placeholder":"Jobi","value":null},{"type":"input","name":"Service Description","placeholder":"Service Description","value":null},{"type":"input","name":"Target Keywords","placeholder":"landing page, Google ads, Facebook ads","value":null}]','prompt' => 'Create a LinkedIn Ads campaign promoting the product [Service Name] to a professional audience. The product is designed to [Service Description]. Target keywords related to [Target Keywords] to reach a relevant audience. Craft ad copy that conveys the product\'s benefits, emphasizes and prompts users to take action.','ai_model' => 'text-davinci-003','created_at' => '2023-12-17 17:51:23','updated_at' => '2023-12-17 17:51:23'),
            array('id' => '3','uuid' => '92541abc-92f4-4651-a0fb-ca083b61b91a','title' => 'Interview question generator','description' => 'Generate Interview questions using this tool.','preview' => '/uploads/interviewquestiongenerator.png','icon' => '/uploads/interviewquestiongenerator.png','type' => 'employer','status' => 'active','fields' => '[{"type":"input","name":"Job Title","placeholder":"Ex. Java Developer","value":null}]','prompt' => 'Generate Interview Question for [Job Title]','ai_model' => 'text-davinci-003','created_at' => '2023-12-17 18:03:27','updated_at' => '2023-12-17 18:03:27'),
            array('id' => '4','uuid' => 'ebdbea3f-4daf-4173-8edb-6d562bc0124b','title' => 'LinkedIn message generator','description' => 'Create compelling outreach messages that capture the attention of top talent on LinkedIn.','preview' => '/uploads/linkedInmessagegenerator.png','icon' => '/uploads/linkedInmessagegenerator.png','type' => 'employer','status' => 'active','fields' => '[{"type":"input","name":"Your Company","placeholder":"DevStation","value":null},{"type":"input","name":"Job Title","placeholder":"Java Developer","value":null}]','prompt' => 'write the message for LinkedIn my company name is "[Your Company]" and the job title is "[Job Title]"','ai_model' => 'text-davinci-003','created_at' => '2023-12-17 18:12:41','updated_at' => '2023-12-17 18:12:41'),
            array('id' => '5','uuid' => '3a647ce7-d024-4eb0-8f66-e916ac644ad4','title' => 'Cover letter generator','description' => 'Generate a cover letter from scratch can be time-consuming, especially if you\'re applying to multiple positions.','preview' => '/uploads/coverlettergenerator.png','icon' => '/uploads/coverlettergenerator.png','type' => 'candidate','status' => 'active','fields' => '[{"type":"input","name":"Your Name","placeholder":"Ex. Jhone Doe","value":null},{"type":"input","name":"job position name","placeholder":"Ex. Laravel Developer","value":null},{"type":"input","name":"Experience","placeholder":"1 year","value":null}]','prompt' => 'Write a job cover letter my name is "[Your Name]" my experience is [Experience] and the job position is "[job position name]"','ai_model' => 'text-davinci-003','created_at' => '2023-12-17 18:24:55','updated_at' => '2023-12-17 18:24:55'),
            array('id' => '6','uuid' => 'f26b7846-d036-4b49-b5c6-3cefa813a888','title' => 'Message Replier','description' => 'Crafting automated responses for efficient and effective communication.','preview' => '/uploads/messagereplier.png','icon' => '/uploads/messagereplier.png','type' => 'candidate','status' => 'active','fields' => '[{"type":"input","name":"Message","placeholder":"Hi, How are you?","value":null}]','prompt' => 'Write a reply message for [Message]','ai_model' => 'text-davinci-003','created_at' => '2023-12-17 18:48:31','updated_at' => '2023-12-17 18:51:21')
          );
          

        AiTemplate::insert($ai_templates);  
          
    }
}
