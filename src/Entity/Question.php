<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\QuestionRepository")
 */
class Question
{ 
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;
    /**
     * @ORM\Column(type="text")
     */
    private $body;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Reply", mappedBy="question", orphanRemoval=true)
     */
    private $replys;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\UserProfile", inversedBy="questions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="questions", cascade={"persist"})
     */
    private $tags;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tag;

    public function __construct()
    {
        $this->replys = new ArrayCollection();
        $this->tags = new ArrayCollection();
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
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
            $reply->setQuestion($this);
        }

        return $this;
    }

    public function removeReply(Reply $reply): self
    {
        if ($this->replys->contains($reply)) {
            $this->replys->removeElement($reply);
            // set the owning side to null (unless already changed)
            if ($reply->getQuestion() === $this) {
                $reply->setQuestion(null);
            }
        }

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(string $body): self
    {
        $this->body = $body;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?UserProfile
    {
        return $this->user;
    }

    public function setUser(?UserProfile $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        $this->tag = $tag;

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(?string $tag): self
    {
        $this->tag = $tag;

        return $this;
    }
}