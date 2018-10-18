<?php
// src/Entity/User.php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
* @ORM\Entity(repositoryClass="App\Repository\UserRepository")
*/

class UserInfo
{
    /**
    * @ORM\Id()
    * @ORM\GeneratedValue()
    * @ORM\GeneratedValue(strategy="SEQUENCE")
    * @ORM\Column(type="integer")
    */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    private $email;
    
    /**
    * @ORM\Column(type="string", length=255, nullable=true)
    */
    private $username;

    private $password;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Avatar", mappedBy="person")
     */
    private $avatars;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Question", mappedBy="user_id", orphanRemoval=true)
     */
    private $questionsAsked;

    public function __construct()
    {
        $this->avatars = new ArrayCollection();
        $this->questionsAsked = new ArrayCollection();
    }

    /**
     * @return Collection|Avatar[]
     */
    public function getAvatars(): Collection
    {
        return $this->avatars;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
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

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestionsAsked(): Collection
    {
        return $this->questionsAsked;
    }

    public function addQuestionsAsked(Question $questionsAsked): self
    {
        if (!$this->questionsAsked->contains($questionsAsked)) {
            $this->questionsAsked[] = $questionsAsked;
            $questionsAsked->setUserId($this);
        }

        return $this;
    }

    public function removeQuestionsAsked(Question $questionsAsked): self
    {
        if ($this->questionsAsked->contains($questionsAsked)) {
            $this->questionsAsked->removeElement($questionsAsked);
            // set the owning side to null (unless already changed)
            if ($questionsAsked->getUserId() === $this) {
                $questionsAsked->setUserId(null);
            }
        }

        return $this;
    }
}
?>