<?php
    namespace App\Form;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\Extension\Core\Type\SubmitType;
    class QuestionType extends AbstractType
    {
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class)
            ->add('question', TextType::class)
            ->add('tags', TextType::class)
            ->add('submit', SubmitType::class, ['label' => 'Ask']);
        ; }
    }
?>