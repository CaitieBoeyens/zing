<?php
    // src/Controller/HomeController.php

    namespace App\Controller;
    
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Routing\Annotation\Route;
    
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
    }
?>