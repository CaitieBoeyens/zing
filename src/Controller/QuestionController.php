<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    
    class QuestionController extends AbstractController 
    {
        /**
         * @Route("/question", name="question_view")
         */
        public function viewQuestion()
        {
            $view = 'question.html.twig';
            return $this->render($view);
        }
    }
?>