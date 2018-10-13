<?php
// src/Entity/Question.php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

class Question
{
    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     */
    private $question;

    public function getQuestion()
    {
        return $this->question;
    }

    public function setQuestion($question)
    {
        $this->question = $question;

        return $this;
    }
}
?>