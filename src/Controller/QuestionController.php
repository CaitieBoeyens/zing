<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    
    class QuestionController extends AbstractController 
    {
        /**
         * @Route("/askQuestion", name="askQuestion_view)
         */
        public function viewAsk()
        {
            $view = 'askQuestion.html.twig';
            return $this->render($view);
        }
    }
?>