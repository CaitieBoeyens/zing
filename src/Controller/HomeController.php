<?php
    // src/Controller/HomeController.php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\Question;
    use App\Entity\UserProfile;
    
    class HomeController extends AbstractController 
    {
        /**
        * @Route("/", name="home_view")
        */
        public function viewHome()
        {
            
            $view = 'home.html.twig';
            return $this->render($view, $model);
        }

        /**
        * @Route("/{tags}", name="home_view_tags")
        */
        public function showQuestionsByTag($tags){
            $questions = $this->getDoctrine()->getRepository(Question::class)->findByTag($tags);
            $users = $this->getDoctrine()->getRepository(UserProfile::class)->findAll();

            $view = 'home.html.twig';
            $model = array('questions' => $questions, 'users' => $users);
            return $this->render($view, $model);
        }

        /**
        * @Route("/", name="home_view")
        */
        public function showQuestions(){
            $questions = $this->getDoctrine()->getRepository(Question::class)->findAll();
            $users = $this->getDoctrine()->getRepository(UserProfile::class)->findAll();

            $view = 'home.html.twig';
            $model = array('questions' => $questions, 'users' => $users);
            return $this->render($view, $model);
        }
    }
?>