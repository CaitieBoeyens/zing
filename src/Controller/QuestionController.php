<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\Question;
    use App\Entity\Reply;
    use App\Entity\UserProfile;
    use App\Form\QuestionType;
    use App\Form\ReplyType;
    use App\Entity\Tag;
    use Symfony\Component\HttpFoundation\Session\Session;
    use Symfony\Component\HttpFoundation\JsonResponse;

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
        public function successQuestion()
        {
            $view = 'success.html.twig';
            $model = array();
            return $this->render($view, $model);
        }

        /**
         * @Route("/question/{id}", name="show_question")
         */
        public function show($id, Request $request){
            $question = $this->getDoctrine()->getRepository(Question::class)->find($id);
            $reply = new Reply();
            $form = $this->createForm(ReplyType::class, $reply);

            if (!$question) {
                throw $this->createNotFoundException(
                    'No question found for id '.$id
                );
            }

            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()){
                //$unmappedFields = $form['unmapped_field']->getData();
                $user = $this->getUser();
                $reply->setUser($user);
                $reply->setQuestion($question);
                $reply->setUpvotes(0);
                $reply->setDownvotes(0);
                
                $reply = $form->getData();
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($reply);
                $entityManager->flush();


                
            }
        
            $view = 'question.html.twig';
            $model = array('question' => $question, 'form' => $form->createView());
            return $this->render($view, $model);
        }

        /**
     * @Route("/vote", name="vote", methods={"POST"}, options={"expose"=true})
     * @param Request $request
     */

     public function vote (Request $request) {
        if ($request->isXmlHttpRequest()){
            $data = json_decode($request->getContent(), true);
            $vote = $data['vote'];
            $id = (int)$data['reply_id'];

            $reply = $this->getDoctrine()->getRepository(Reply::class)->find($id);

            if($vote === 1) {
                $upvotes = $reply->getUpvotes();
                $reply->setUpvotes((int)$upvotes + 1);
            }
            else if($vote === -1) {
                $downvotes = $reply->getDownvotes();
                $reply->setDownvotes((int)$downvotes - 1);
            }

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($reply);
            $entityManager->flush();

            $response = new JsonResponse($reply);
        }
        return ($response);
    }

    /**
     * @Route("/delete_reply", name="deleteReply", methods={"POST"}, options={"expose"=true})
     * @param Request $request
     */

    public function deleteReply(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $data = json_decode($request->getContent(), true);
            $id = (int) $data['reply_id'];

            $removedReply = $this->getDoctrine()->getRepository(Reply::class)->find($id);

            $removedReply->removeReply($id);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($removedReply);
            $entityManager->flush();

            $response = new JsonResponse($removedReply);
        }
        return ($response);
    }

        
    }
?>