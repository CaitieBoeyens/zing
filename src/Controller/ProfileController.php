<?php

namespace App\Controller;

use App\Entity\Login;
use App\Entity\User;
use App\Form\LoginInfoType;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ProfileController extends AbstractController
{
    /**
     * @Route("/login", name="login_view")
     */
    public function viewLogin(Request $request)
    {

        $loginInfo = new Login();
        $form = $this->createForm(LoginInfoType::class, $loginInfo);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
        // $form->getData() holds the submitted values
            $loginProfile = $form->getData();

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($loginInfo);
            $entityManager->flush();

            return $this->redirectToRoute('profile_success');
        }

        $view = 'login.html.twig';
        $model = array('form' => $form->createView());
        return $this->render($view, $model);
    }

    /**
     * @Route("/signup", name="signup_view")
     */

    public function newProfile(Request $request,  UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            $user = $form->getData();

            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
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
    public function newAvatar(){

        $view = 'image.html.twig';

        return $this->render($view);
    }

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
