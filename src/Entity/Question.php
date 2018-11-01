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
     * @ORM\OneToMany(targetEntity="App\Entity\Response", mappedBy="question_id", orphanRemoval=true)
     */
    private $responses;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\UserProfile", inversedBy="questions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="questions")
     */
    private $tags;

    public function __construct()
    {
        $this->responses = new ArrayCollection();
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
     * @return Collection|Response[]
     */
    public function getResponses(): Collection
    {
        return $this->responses;
    }

    public function addResponse(Response $response): self
    {
        if (!$this->responses->contains($response)) {
            $this->responses[] = $response;
            $response->setQuestion($this);
        }

        return $this;
    }

    public function removeResponse(Response $response): self
    {
        if ($this->responses->contains($response)) {
            $this->responses->removeElement($response);
            // set the owning side to null (unless already changed)
            if ($response->getQuestion() === $this) {
                $response->setQuestion(null);
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
     * @return Collection|QuestionTopic[]
     */
    public function getTag(): Collection
    {
        return $this->tag;
    }

    public function addTag(QuestionTopic $tag): self
    {
        if (!$this->tag->contains($tag)) {
            $this->tag[] = $tag;
        }

        return $this;
    }

    public function removeTag(QuestionTopic $tag): self
    {
        if ($this->tag->contains($tag)) {
            $this->tag->removeElement($tag);
        }

        return $this;
    }

    /**
     * @return Collection|QuestionTopic[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }
}
