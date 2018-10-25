<?php

    namespace App\Controller;
    //Client ID = 958f322a3144316
    //Client Secret = 6824de7685e12c715476a1fe99a8ed3e5632caf3
    //access_token = 4abaf47045e208461095d5595dff0d5fb94b3b50
    //refresh_token=86d6133ea218f29f26ce219f2e62fd05b04bf25

    //WITH CALLBACK
    // CLIENT ID - 3125eeaed96df4e
    // CLIENT SECRET - 8aebb8d1c8fc1e2563cd4d5f0a8b6a5292b79db1
    
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

            $client = new \Imgur\Client();
            $client->setOption('client_id', '3125eeaed96df4e');
            $client->setOption('client_secret', '8aebb8d1c8fc1e2563cd4d5f0a8b6a5292b79db1');

            $pathToFile = '/Users/brianirons/Desktop/Unknown.png';
            $imageData = [
                'image' => base64_encode(file_get_contents($pathToFile)),
                'type'  => 'base64',
            ];

            $client->api('image')->upload($imageData);

            $question = new Question();
            $form = $this->createForm(QuestionType::class, $question);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()){
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