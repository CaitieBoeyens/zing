<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Algolia\SearchBundle\IndexManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Question;
use App\Entity\Tag;


class SearchController extends AbstractController
{
    protected $indexManager;

    public function __construct(IndexManagerInterface $indexingManager)
    {
        $this->indexManager = $indexingManager;
    }

    /**
    * @Route("/searchResults", name="search_view")
    */
    public function getQuestionCount()
    {
        //$this->indexManager->index($questions, $entityManager);
        //$this->indexManager->index($tags, $entityManager);
        $em = $this->getDoctrine()->getManagerForClass(Tag::class);
        $posts = $this->indexManager->search('query', Tag::class, $em);
        return $this->render('search/searchResults.html.twig', ['count' => $posts,]);
    }
}

?>