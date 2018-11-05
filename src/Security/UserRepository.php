<?php

namespace App\Security;

use App\Entity\UserProfile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method UserProfile|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserProfile|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserProfile[]    findAll()
 * @method UserProfile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, UserProfile::class);
    }

    /**
        * @return UserProfile[] Returns an array of UserProfile objects
        * @params $username
    */
    public function findOneByUsername($username): ?UserProfile
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.username = :username')
            ->setParameter('username', $username)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    /**
        * @return UserProfile[] Returns an array of UserProfile objects
 
    */
    public function searchUserName($name)
    {
        //$entityManager = $this->getEntityManager();
        //$query = $entityManager->createQuery('SELECT user FROM App\Entity\UserProfile user WHERE user.username LIKE :name')->setParameter('name', '%'.$name.'%');
        //returns an array of Product objects
        //return $query->execute();
        //$quieryBuilder = 
        
        $result = $this->createQueryBuilder('u')
            ->where('u.username LIKE :term')
            ->setParameter('term', $name.'%')
            ->getQuery()
            ->getResult();

        return $result;
    }
}
