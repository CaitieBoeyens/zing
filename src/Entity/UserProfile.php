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
     * @Assert\NotBlank()
     * @Assert\Email(message = "The email '{{ email }}' is not a valid email.")
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
     * @ORM\OneToMany(targetEntity="App\Entity\Question", mappedBy="user", orphanRemoval=true)
     */
    private $questions;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\UserProfile", mappedBy="followers")
     */
    private $following;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\UserProfile", inversedBy="following")
     * @ORM\JoinTable(name="userFollows", 
        *   joinColumns={
        *       @ORM\JoinColumn(name="follower_id", referencedColumnName="id")
        *   },
        *   inverseJoinColumns={
        *       @ORM\JoinColumn(name="following_id", referencedColumnName="id")
        *   }
     * )
     */
    private $followers;
    
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reply", mappedBy="user", orphanRemoval=true)
     */
    private $replys;

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
        $this->following = new ArrayCollection();
        $this->replys = new ArrayCollection();
        $this->followers = new ArrayCollection();
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

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    // /**
    // * @Assert\IsTrue(message="The password cannot match your username")
    // */
    // public function isPasswordSafe()
    // {
    //     if ($password === $username) {
    //         return true;
    //     }
    // }

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
            $avatar->setUser($this);
        }

        return $this;
    }

    public function removeAvatar(Avatar $avatar): self
    {
        if ($this->avatar->contains($avatar)) {
            $this->avatar->removeElement($avatar);
            // set the owning side to null (unless already changed)
            if ($avatar->getUser() === $this) {
                $avatar->setUser(null);
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
            $question->setUser($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->contains($question)) {
            $this->questions->removeElement($question);
            // set the owning side to null (unless already changed)
            if ($question->getUser() === $this) {
                $question->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserProfile[]
     */
    public function getFollowing(): Collection
    {
        return $this->following;
    }

    public function addFollowing(UserProfile $following): self
    {
        if (!$this->following->contains($following)) {
            $this->following[] = $following;
            $following->addFollower($this);
        }
    }

    public function removeFollowing(UserProfile $following): self
    {
        if ($this->following->contains($following)) {
            $this->following->removeElement($following);
            $following->removeFollower($this);
        }

        return $this;
    }

    /**
     * @return Collection|UserProfile[]
     */
    public function getFollower(): Collection
    {
        return $this->follower;
    }

    public function addFollower(UserProfile $follower): self
    {
        if (!$this->follower->contains($follower)) {
            $this->follower[] = $follower;
            $follower->addFollowing($this);
        }

        return $this;
    }

    public function removeFollower(UserProfile $follower): self
    {
        if ($this->follower->contains($follower)) {
            $this->follower->removeElement($follower);
            $follower->removeFollowing($this);

        }
    }

    /**
     * @return Collection|Reply[]
     */
    public function getReplys(): Collection
    {
        return $this->replys;
    }

    public function addReply(Reply $reply): self
    {
        if (!$this->replys->contains($reply)) {
            $this->replys[] = $reply;
            $reply->setUser($this);
        }

        return $this;
    }


    public function removeReply(Reply $reply): self
    {
        if ($this->replys->contains($reply)) {
            $this->replys->removeElement($reply);
            // set the owning side to null (unless already changed)
            if ($reply->getUser() === $this) {
                $reply->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserProfile[]
     */
    public function getFollowers(): Collection
    {
        return $this->followers;
    }

}
