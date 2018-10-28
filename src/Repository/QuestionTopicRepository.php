<?php

namespace App\Repository;

use App\Entity\QuestionTopic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method QuestionTopic|null find($id, $lockMode = null, $lockVersion = null)
 * @method QuestionTopic|null findOneBy(array $criteria, array $orderBy = null)
 * @method QuestionTopic[]    findAll()
 * @method QuestionTopic[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuestionTopicRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, QuestionTopic::class);
    }

//    /**
//     * @return QuestionTopic[] Returns an array of QuestionTopic objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('q.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?QuestionTopic
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
