<?php

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
* @ORM\Entity(repositoryClass="App\Repository\LoginRepository")
*/

class UserProfile
{
    /**
    * @ORM\Id()
    * @ORM\GeneratedValue()
    * @ORM\GeneratedValue(strategy="SEQUENCE")
    * @ORM\Column(type="integer")
    */

    private $id;
    /**
    * @ORM\Column(type="string", length=255, nullable=true)
    */

    private $username;

    /**
    * @ORM\Column(type="string", length=255, nullable=true)
    */

    /**
    * @Assert\NotBlank()
    */
    
    private $password;

    /**
    * @ORM\Column(type="string", length=255, nullable=true)
    */

    /**
    * @Assert\NotBlank()
    */

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string {
        return $this->password;
    }

    public function setPassword(string $password): self {
        $this->password = $password;

        return $this;
    }
}
?>
