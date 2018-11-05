<?php
    // src/Controller/HomeController.php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\Question;
    
    class HomeController extends AbstractController 
    {
        /**
        * @Route("/", name="home_view")
        */
        public function viewHome()
        {
            
            $view = 'home.html.twig';

            return $this->render($view);
        }

        /**
        * @Route("/", name="home_view")
        */
        public function showQuestions(){
            $questions = $this->getDoctrine()->getRepository(Question::class)->findAll();


            $view = 'home.html.twig';
            $model = array('questions' => $questions);
            return $this->render($view, $model);
        }
    }
?>