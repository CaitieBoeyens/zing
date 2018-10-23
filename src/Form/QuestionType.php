<?php
    // Question form class
    namespace App\Form;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    class QuestionType extends AbstractType
    {
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class, ['label' => 'Give your question a title'])
            ->add('body', TextareaType::class, ['label' => 'What do you need advice about?', 'attr' => ['onkeyup' => 'new do_resize(this)', 'rows'=> 1]])
            ->add('submit', SubmitType::class, ['label' => 'Ask', 'attr' => ['class' => 'button is-blue is-inverted is-rounded']]);
        ; }
    }
?>