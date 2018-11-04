<?php

namespace App\DataFixtures;

use App\Entity\Question;
use App\Entity\UserProfile;
use App\Entity\Tag;
use App\Entity\Response;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class FillerFix extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        // ---- USERS ----------------------------------------------------
        $james = new UserProfile();
        $james->setUsername('James');
        $password = $this->encoder->encodePassword($james, '1234');
        $james->setPassword($password);
        $james->setEmail('james@jmail.com');
        $james->setRoles(["ROLE_USER"]);

        $jimmy = new UserProfile();
        $jimmy->setUsername('Jimmy');
        $password = $this->encoder->encodePassword($jimmy, '1234');
        $jimmy->setPassword($password);
        $jimmy->setEmail('jimmy@jmail.com');
        $jimmy->setRoles(["ROLE_USER"]);
        $manager->persist($jimmy);

        $joanne = new UserProfile();
        $joanne->setUsername('Joanne');
        $password = $this->encoder->encodePassword($joanne, '1234');
        $joanne->setPassword($password);
        $joanne->setEmail('joanne@jmail.com');
        $joanne->setRoles(["ROLE_USER"]);

        $julia = new UserProfile();
        $julia->setUsername('Julia');
        $password = $this->encoder->encodePassword($julia, '1234');
        $julia->setPassword($password);
        $julia->setEmail('julia@jmail.com');
        $julia->setRoles(["ROLE_USER"]);

        $jack = new UserProfile();
        $jack->setUsername('Jack');
        $password = $this->encoder->encodePassword($jack, '1234');
        $jack->setPassword($password);
        $jack->setEmail('jack@jmail.com');
        $jack->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        
        //-------- TAGS ------------------------------------------------------
        $loveTag = new Tag();
        $loveTag->setName('love');

        $DIYTag = new Tag();
        $DIYTag->setName('DIY');

        $homeTag = new Tag();
        $homeTag->setName('home');

        $cookingTag = new Tag();
        $cookingTag->setName('cooking');

        $fitnessTag = new Tag();
        $fitnessTag->setName('fitness');
        

        //-------- QUESTIONS ------------------------------------------------------
        $question1 = new Question();
        $question1->setTitle('How do you know');
        $question1->setBody('How do you know if a man is interested in you?');
        $question1->setUser($julia);
        $question1->addTag($loveTag);

        $question2 = new Question();
        $question2->setTitle('Plug wiring');
        $question2->setBody('What colour is live, and what colour is neutral when wiring a plug?');
        $question2->setUser($julia);
        $question2->addTag($homeTag);

        $question3 = new Question();
        $question3->setTitle('Soy free muffins');
        $question3->setBody('What is the best recipe for soy free banana muffins?');
        $question3->setUser($jimmy);
        $question3->addTag($cookingTag);

        $question4 = new Question();
        $question4->setTitle('Best gym franchise');
        $question4->setBody('What is better? Virgin Active or Planet Fitness?');
        $question4->setUser($james);
        $question4->addTag($fitnessTag);

        $question5 = new Question();
        $question5->setTitle('Oak');
        $question5->setBody('What varnish do I use on oak tables?');
        $question5->setUser($joanne);
        $question5->addTag($DIYTag);

        $question6 = new Question();
        $question6->setTitle('Sand paper grit');
        $question6->setBody('What level of coarseness do I need to strip varnish using a belt sander?');
        $question6->setUser($james);
        $question6->addTag($DIYTag);

        $question7 = new Question();
        $question7->setTitle('Tile Cutting');
        $question7->setBody('What tools do I need to cut tiles?');
        $question7->setUser($james);
        $question7->addTag($DIYTag);

        $question8 = new Question();
        $question8->setTitle('Ceramic drill bit');
        $question8->setBody('What drill bit tip do you recommend for old tiles?');
        $question8->setUser($james);
        $question8->addTag($DIYTag);

        $loveTag->addQuestion($question1);
        $DIYTag->addQuestion($question5);
        $DIYTag->addQuestion($question7);
        $DIYTag->addQuestion($question8);
        $homeTag->addQuestion($question2);
        $cookingTag->addQuestion($question3);   
        $fitnessTag->addQuestion($question4);
        
        // ----- RESPONSES ----------------------------------------------------------
        $resp1 = new Response();
        $resp1->setQuestion($question4);
        $resp1->setUser($jimmy);
        $resp1->setBody('Bruuu, It"s def VA, they got the best equipment my boychi!');
        $resp1->setUpvotes(1);
        $resp1->setDownvotes(0);

        $question4->addResponse($resp1);

        $manager->persist($james);
        $manager->persist($jimmy);
        $manager->persist($joanne);
        $manager->persist($julia);
        $manager->persist($jack);

        $manager->persist($question1);
        $manager->persist($question2);
        $manager->persist($question3);
        $manager->persist($question4);
        $manager->persist($question5);

        $manager->persist($loveTag);
        $manager->persist($DIYTag);
        $manager->persist($homeTag);
        $manager->persist($cookingTag);
        $manager->persist($fitnessTag);

        $manager->persist($resp1);

        $manager->flush();
    }
}
