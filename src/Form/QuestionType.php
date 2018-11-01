<?php
    // Question form class
    namespace App\Form;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
    use App\Entity\Topics;
    use Symfony\Component\Form\Extension\Core\Type\CollectionType;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use App\Controller\QuestionController;
    use App\Entity\Tag;
    use App\Entity\Question;

    class QuestionType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            //$topics = $options['topics'];
            $builder
                ->add('title', TextType::class, ['label' => 'Give your question a title'])
                ->add('body', TextareaType::class, ['label' => 'What do you need advice about?', 'attr' => ['onkeyup' => 'new do_resize(this)', 'rows'=> 1]])
                ->add('tags', CollectionType::class, array(
                    'entry_type' => TagType::class,
                    'entry_options' => array('label' => false),
                ))
                    /*
                        psudo code
                        'choice_value = question.addTag(topic name)
                    /*
                ))
                /*->add('tag', ChoiceType::class, array(
                    'choices' => $topics,
                    'label' => 'Question Category'
                ))
                */
                ->add('submit', SubmitType::class, ['label' => 'Ask', 'attr' => ['class' => 'button is-blue is-inverted is-rounded']]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults(array(
                'data_class' => Question::class,
            ));
        }
    }
?>