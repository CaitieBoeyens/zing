<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\QuestionTopicRepository")
 */
class QuestionTopic
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
    private $tag;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Question", inversedBy="questionTopics")
     */
    private $question_id;

    public function __construct()
    {
        $this->question_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTag(): ?string
    {
        return $this->tag;
    }

    public function setTag(string $tag): self
    {
        $this->tag = $tag;

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestionId(): Collection
    {
        return $this->question_id;
    }

    public function addQuestionId(Question $questionId): self
    {
        if (!$this->question_id->contains($questionId)) {
            $this->question_id[] = $questionId;
        }

        return $this;
    }

    public function removeQuestionId(Question $questionId): self
    {
        if ($this->question_id->contains($questionId)) {
            $this->question_id->removeElement($questionId);
        }

        return $this;
    }
}
