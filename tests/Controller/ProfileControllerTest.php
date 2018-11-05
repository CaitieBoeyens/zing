<?php
// tests/Controller/ProfileControllerTest.php
namespace App\Tests\Controller;

use App\Controller\ProfileController;
use App\Entity\Avatar;
use App\Form\AvatarType;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ProfileControllerTest extends WebTestCase
{
    public function testNewAvatar()
    {

        $avatar = static::newAvatar();

        $avatar->request('GET', 'image.html.twig');

        $this->assertEquals(200, $avatar->getResponse()->getStatusCode());

    }
}   

?>