<?php
    namespace App\Form;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\FormBuilderInterface;

    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;

    class AvatarType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('file', FileType::class, [
                    'label' => ' ', 
                    'attr' => [
                        'class' => 'file-input hide-file-input'
                        ]
                    
                    ])
                ->add('submit', SubmitType::class, ['label' => 'add avatar', 'attr' => ['class' => 'button is-blue is-inverted is-rounded']]);
        }
    }
?>