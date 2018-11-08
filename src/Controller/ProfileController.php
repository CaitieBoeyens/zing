<?php

namespace App\Controller;

use App\Entity\Avatar;
use App\Entity\Login;
use App\Entity\Question;
use App\Entity\UserProfile;
use App\Form\AdminType;
use App\Form\AvatarType;
use App\Form\LoginInfoType;
use App\Form\UserProfileType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
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

    public function newProfile(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = new UserProfile();
        $form = $this->createForm(UserProfileType::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            $user = $form->getData();

            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);
            $user->setRoles(['ROLE_USER']);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            $user->eraseCredentials();

            $token = new UsernamePasswordToken(
                $user,
                $password,
                'main',
                $user->getRoles()
            );

            $this->get('security.token_storage')->setToken($token);
            $this->get('session')->set('_security_main', serialize($token));

            return $this->redirectToRoute('image_upload');
        }

        $view = 'register.html.twig';

        $model = array('form' => $form->createView());
        return $this->render($view, $model);
    }

    /**
     * @Route ("upload/img", name="image_upload", methods="GET|POST")
     */
    public function newAvatar(Request $request)
    {

        $avatar = new Avatar();
        $form = $this->createForm(AvatarType::class, $avatar);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($avatar);
            $entityManager->flush();

            return $this->redirectToRoute('profile_success');
        }

        $view = 'image.html.twig';

        $model = array('form' => $form->createView());
        return $this->render($view, $model);
    }

    /**
     * @Route("/image", name="image", methods={"POST"}, options={"expose"=true})
     * @param Request $request
     */

    public function getAvatar(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $avatar = new Avatar();
            $form = $this->createForm(AvatarType::class, $avatar);
            /** @var Symfony\Component\HttpFoundation\File\UploadedFile $file */
            $file = $request->files->get('avatar');

            $fileName = $this->generateUniqueFileName() . '.' . $file->guessExtension();

            try {
                $file->move(
                    $this->getParameter('avatars_directory'),
                    $fileName
                );
            } catch (FileException $e) {
                // ... handle exception if something happens during file upload
            }

            $avatar->setUrl($fileName);
            $avatar->setFile('');
            $avatar->setActive(true);

            $user = $this->getUser();
            $avatars = $user->getAvatar()->toArray();
            foreach ($avatars as $a) {
                $fileSystem = new Filesystem();
                $user->removeAvatar($a);
                /*
            $url = $a->getURL();
            $folder = $this->getParameter('avatars_directory');
            $oldfile = $folder.'/'.$url;
            $fileSystem->remove('file', $url); */
            }
            $user->addAvatar($avatar);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($avatar);
            $entityManager->flush();
        }
        return $this->redirectToRoute('profile_success');
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

    /**
    * @Route("/profile/{id}", name="show_profile")
    */
    public function viewUser($id, Request $req){
        //$results = $this->getDoctrine()->getRepository(UserProfile::class)->findBy(['id'=>$id]);
        
        $view = 'success.html.twig';
        $model = array();
        return $this->render($view, $model);
    }

    /**
     * @Route("/profile", name="user_profile")
     */
    public function viewProfile(Request $request)
    {
        $user = $this->getUser();
        $replies = $user->getReplys();

        $upvotes = 0;
        foreach ($replies as $r) {
            $num = $r->getUpvotes();

            $upvotes += $num;
        }

        $downvotes = 0;
        foreach ($replies as $r) {
            $num = $r->getDownvotes();

            $downvotes += $num;
        }

        $view = 'profile.html.twig';
        $model = array('upvotes' => $upvotes, 'downvotes' => $downvotes, 'user' => $user);
        return $this->render($view, $model);
    }

    /**
     * @Route("/autocomplete/{term}", name="autocomplete")
     */
    public function autocompleteAction($term, Request $request)
    {
        $users = array();
        $searchTerm = $term;
        $results = $this->getDoctrine()->getRepository(UserProfile::class)->searchUserName(strtolower($searchTerm));
        
        foreach ($results as $result){
            array_push($users, $result->getUsername());
        }
        
        return $this->json($users);
    }

    /**
     * @Route("/admin", name="admin_view", methods="GET|POST")
     */
    public function adminConsole(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $user = new UserProfile();
        $form = $this->createForm(AdminType::class, $user);

        $users = $this->getDoctrine()->getRepository(UserProfile::class)->findAll();
        $questions = $this->getDoctrine()->getRepository(Question::class)->findAll();

        // return new JsonResponse($users);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();

            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);
            $user->setRoles(["ROLE_USER", "ROLE_ADMIN"]);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            $user->eraseCredentials();

        }

        $view = 'admin.html.twig';

        $model = array('form' => $form->createView(), 'users' => $users, 'questions' => $questions);
        return $this->render($view, $model);
    }

    /**
     * @Route("/remove_admin", name="removeAdmin", methods={"POST"}, options={"expose"=true})
     * @param Request $request
     */

    public function removeAdmin(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $data = json_decode($request->getContent(), true);
            $id = (int) $data['admin_id'];

            $adminUser = $this->getDoctrine()->getRepository(UserProfile::class)->find($id);

            $adminUser->setRoles(['ROLE_USER']);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($adminUser);
            $entityManager->flush();

            $response = new JsonResponse($adminUser);
        }
        return ($response);
    }

    /**
     * @Route("/ban_user", name="banUser", methods={"POST"}, options={"expose"=true})
     * @param Request $request
     */

    public function banUser(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $data = json_decode($request->getContent(), true);
            $id = (int) $data['user_id'];

            $bannedUser = $this->getDoctrine()->getRepository(UserProfile::class)->find($id);

            $bannedUser->setRoles(['BANNED']);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($bannedUser);
            $entityManager->flush();

            $response = new JsonResponse($bannedUser);
        }
        return ($response);
    }

    /**
     * @Route("/restore_user", name="restoreUser", methods={"POST"}, options={"expose"=true})
     * @param Request $request
     */

    public function restoreUser(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
            $data = json_decode($request->getContent(), true);
            $id = (int) $data['user_id'];

            $restoredUser = $this->getDoctrine()->getRepository(UserProfile::class)->find($id);

            $restoredUser->setRoles(['ROLE_USER']);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($restoredUser);
            $entityManager->flush();

            $response = new JsonResponse($restoredUser);
        }
        return ($response);
    }

    /**
     * @Route("/profile/{id}", name="show_profile")
     */

    public function show($id)
    {
        $user = $this->getDoctrine()->getRepository(UserProfile::class)->find($id);
        $replies = $user->getReplys();

        $upvotes = 0;
        foreach ($replies as $r) {
            $num = $r->getUpvotes();

            $upvotes += $num;
        }

        $downvotes = 0;
        foreach ($replies as $r) {
            $num = $r->getDownvotes();

            $downvotes += $num;
        }


        $view = 'profile.html.twig';
        $model = array('upvotes' => $upvotes, 'downvotes' => $downvotes, 'user' => $user);
        return $this->render($view, $model);
    }

}
