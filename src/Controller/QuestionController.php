<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\Question;
    use App\Form\QuestionType;
    use App\Entity\Tag;
    use Symfony\Component\HttpFoundation\Session\Session;

    class QuestionController extends AbstractController 
    {      
        /**
         * @Route("/question", name="question_view")
         */
        public function newQuestion(Request $request)
        {
            $question = new Question();

            // dummy code - this is here just so that the Task has some tags
            // otherwise, this isn't an interesting example
            $tag1 = new Tag();
            $tag1->setName('tag1');
            $question->getTags()->add($tag1);
            $tag2 = new Tag();
            $tag2->setName('tag2');
            $question->getTags()->add($tag2);
            // end dummy code

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

            $view = 'question.html.twig';
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
    }
?>