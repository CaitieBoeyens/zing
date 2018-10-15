<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    use App\Entity\UserInfo;
    use App\Form\UserInfoType;
    
    class ProfileController extends AbstractController 
    {
        /**
        * @Route("/login", name="login_view")
        */
        public function viewLogin()
        {
            
            $view = 'login.html.twig';

            return $this->render($view);
        }

        /**
        * @Route("/signup", name="signup_view")
        */
        
         public function newProfile(Request $request)
        {
            $userInfo = new UserInfo();
            $form = $this->createForm(UserInfoType::class, $userInfo);
            
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                // $form->getData() holds the submitted values
                $userProfile = $form->getData();

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($userInfo);
                $entityManager->flush();


                return $this->redirectToRoute('image_upload');
            }

            $view = 'register.html.twig';
            $model = array('form' => $form->createView());

            return $this->render($view, $model);
        }

        /**
         * @Route ("signup/img", name="image_upload")
         */
        public function newAvatar(){}


        /**
        * @Route("/success", name="profile_success")
        */
        public function successProfile(Request $request)
        {
            $view = 'success.html.twig';
            $model = array();
            return $this->render($view, $model);
        }
    }
?>