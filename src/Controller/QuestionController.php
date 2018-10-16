<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\Question;
    use App\Form\QuestionType;
    
    class QuestionController extends AbstractController 
    {
        /**
         * @Route("/question", name="question_view")
         */
        public function newQuestion(Request $request)
        {
            $question = new Question();
            $form = $this->createForm(QuestionType::class, $question);
            $form->handleRequest($request);
            $view = 'question.html.twig';
            $model = array('form' => $form->createView());
            return $this->render($view, $model);
        }
    }
?>