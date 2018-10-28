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
     * @ORM\ManyToMany(targetEntity="App\Entity\QuestionTopic", mappedBy="question_id")
     */
    private $questionTopics;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\UserProfile", inversedBy="questions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user_id;

    public function __construct()
    {
        $this->responses = new ArrayCollection();
        $this->questionTopics = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getTags(): ?array
    {
        return $this->tags;
    }

    public function setTags(array $tags): self
    {
        $this->tags = ['DIY'];

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

    public function getUserId(): ?UserProfile
    {
        return $this->user_id;
    }

    public function setUserId(?UserProfile $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * @return Collection|QuestionTopic[]
     */
    public function getQuestionTopics(): Collection
    {
        return $this->questionTopics;
    }

    public function addQuestionTopic(QuestionTopic $questionTopic): self
    {
        if (!$this->questionTopics->contains($questionTopic)) {
            $this->questionTopics[] = $questionTopic;
            $questionTopic->addQuestionId($this);
        }

        return $this;
    }

    public function removeQuestionTopic(QuestionTopic $questionTopic): self
    {
        if ($this->questionTopics->contains($questionTopic)) {
            $this->questionTopics->removeElement($questionTopic);
            $questionTopic->removeQuestionId($this);
        }

        return $this;
    }
}
