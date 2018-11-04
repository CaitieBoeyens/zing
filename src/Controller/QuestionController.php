<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\Question;
    use App\Entity\Reply;
    use App\Form\QuestionType;
    use App\Form\ReplyType;
    use App\Entity\Tag;
    use Symfony\Component\HttpFoundation\Session\Session;

    class QuestionController extends AbstractController 
    {      
        /**
         * @Route("/ask_question", name="ask_question_view")
         */
        public function newQuestion(Request $request)
        {
            $question = new Question();

            $form = $this->createForm(QuestionType::class, $question);
            
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()){
                //$unmappedFields = $form['unmapped_field']->getData();
                $user = $this->getUser();
                $question->setUser($user);
                
                $question = $form->getData();
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($question);
                $entityManager->flush();


                return $this->redirectToRoute('question_success');
            }

            $view = 'ask_question.html.twig';
            $model = array('form' => $form->createView());
            return $this->render($view, $model);
        }

        /**
         * @Route("/q/success", name="question_success")
         */
        public function successQuestion(Request $request)
        {
            $view = 'success.html.twig';
            $model = array();
            return $this->render($view, $model);
        }

        /**
         * @Route("/question/{id}", name="show_question")
         */
        public function show($id){
            $question = $this->getDoctrine()->getRepository(Question::class)->find($id);
            $reply = new Reply();
            $form = $this->createForm(ReplyType::class, $reply);

            if (!$question) {
                throw $this->createNotFoundException(
                    'No question found for id '.$id
                );
            }
        
            $view = 'question.html.twig';
            $model = array('question' => $question, 'form' => $form->createView());
            return $this->render($view, $model);
        }
    }
?>