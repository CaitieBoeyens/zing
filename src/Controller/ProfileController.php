<?php

namespace App\Controller;

use App\Entity\Login;
use App\Entity\UserProfile;
use App\Entity\Avatar;
use App\Form\LoginInfoType;
use App\Form\UserProfileType;
use App\Form\AvatarType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

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
        $user = new UserProfile();
        $form = $this->createForm(UserProfileType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            $user = $form->getData();

            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            $user -> eraseCredentials();

            return $this->redirectToRoute('image_upload');
        }

        $view = 'register.html.twig';

        $model = array('form' => $form->createView());
        return $this->render($view, $model);
    }

    /**
     * @Route ("signup/img", name="image_upload")
     */
    public function newAvatar(Request $request){

        $avatar = new Avatar();
        $form = $this->createForm(AvatarType::class, $avatar);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            /** @var Symfony\Component\HttpFoundation\File\UploadedFile $file */
            $file = $form->get('file')->getData();

            $fileName = $this->generateUniqueFileName().'.'.$file->guessExtension();

            try {
                $file->move(
                    $this->getParameter('avatars_directory'),
                    $fileName
                );
            } catch (FileException $e) {
                // ... handle exception if something happens during file upload
            }

            $avatar->setUrl($fileName);
            $avatar -> setActive(true);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($avatar);
            $entityManager->flush();

            return $this->redirectToRoute('home_view');
        }

        $view = 'image.html.twig';

        $model = array('form' => $form->createView());
        return $this->render($view, $model);
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

    /**
     * @return string
     */
    private function generateUniqueFileName()
    {
        // md5() reduces the similarity of the file names generated by
        // uniqid(), which is based on timestamps
        return md5(uniqid());
    }
}

?>
