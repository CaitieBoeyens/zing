<?php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    
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
        public function viewSignup()
        {
            
            $view = 'register.html.twig';

            return $this->render($view);
        }
    }
?>