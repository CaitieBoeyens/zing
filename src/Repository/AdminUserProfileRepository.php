<?php

namespace App\Repository;

use App\Entity\AdminUserProfile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method AdminUserProfile|null find($id, $lockMode = null, $lockVersion = null)
 * @method AdminUserProfile|null findOneBy(array $criteria, array $orderBy = null)
 * @method AdminUserProfile[]    findAll()
 * @method AdminUserProfile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdminUserProfileRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, AdminUserProfile::class);
    }

//    /**
//     * @return AdminUserProfile[] Returns an array of AdminUserProfile objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AdminUserProfile
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
