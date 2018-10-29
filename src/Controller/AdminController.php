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
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class AdminController extends AbstractController 
{

    /**
     * @Route("/admin", name="admin_view")
     */
    public function viewProfile(Request $request)
    {
        $view = 'admin.html.twig';
        $model = array();
        return $this->render($view, $model);
    }

}

?>