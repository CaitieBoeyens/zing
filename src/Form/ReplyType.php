<?php
    // QReply form class
    namespace App\Form;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
    use Symfony\Component\Form\Extension\Core\Type\CollectionType;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use App\Controller\QuestionController;
    use App\Entity\Reply;

    class ReplyType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            //$topics = $options['topics'];
            $builder
                
                ->add('body', TextareaType::class, ['label' => ' ', 'attr' => ['onkeyup' => 'new do_resize(this)', 'rows'=> 1]])
                
                ->add('submit', SubmitType::class, ['label' => 'Give advice', 'attr' => ['class' => 'button is-blue is-inverted is-rounded']]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults(array(
                'data_class' => Reply::class,
            ));
        }
    }
?>