<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass="App\Security\UserRepository")
 */
class UserProfile implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank()
     */
    private $username;


    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", length=64)
     
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * * @Assert\NotBlank()
     */
    private $email;

    /**
     * @Assert\NotBlank()
     * @Assert\Length(max=4096)
     */
    private $plainPassword;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Avatar", mappedBy="user", orphanRemoval=true)
     */
    private $avatar;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Question", mappedBy="user_id", orphanRemoval=true)
     */
    private $questions;

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function __construct()
    {
        $this->questionsAsked = new ArrayCollection();
        $this->avatar = new ArrayCollection();
        $this->questions = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
         $this->plainPassword = null;
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
            $questionsAsked->setUId($this);
        }

        return $this;
    }

    public function removeQuestionsAsked(Question $questionsAsked): self
    {
        if ($this->questionsAsked->contains($questionsAsked)) {
            $this->questionsAsked->removeElement($questionsAsked);
            // set the owning side to null (unless already changed)
            if ($questionsAsked->getUId() === $this) {
                $questionsAsked->setUId(null);
            }
        }

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @return Collection|Avatar[]
     */
    public function getAvatar(): Collection
    {
        return $this->avatar;
    }

    public function addAvatar(Avatar $avatar): self
    {
        if (!$this->avatar->contains($avatar)) {
            $this->avatar[] = $avatar;
            $avatar->setPerson($this);
        }

        return $this;
    }

    public function removeAvatar(Avatar $avatar): self
    {
        if ($this->avatar->contains($avatar)) {
            $this->avatar->removeElement($avatar);
            // set the owning side to null (unless already changed)
            if ($avatar->getPerson() === $this) {
                $avatar->setPerson(null);
            }
        }

        return $this;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setUserId($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->contains($question)) {
            $this->questions->removeElement($question);
            // set the owning side to null (unless already changed)
            if ($question->getUserId() === $this) {
                $question->setUserId(null);
            }
        }

        return $this;
    }

}
