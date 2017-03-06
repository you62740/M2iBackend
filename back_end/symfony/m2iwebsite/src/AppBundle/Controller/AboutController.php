<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Student as Student;
use Symfony\Bundle\FrameworkBundle\Controller\Controller as Controller;
use Symfony\Component\HttpFoundation\Request as Request;
use Symfony\Component\Form\Extension\Core\Type\TextType as TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType as SubmitType;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class AboutController extends Controller
{
   
	public function display(Request $request, $etudiant)
	{
	
		$student 	= new Student();
		// on récupère de type formbuilder qui comme son nom l'indique
		// va nous aider à créer un formulaire
		// ici, on lui envoit une entité à gérer de type Student
		$builder 	= $this->createFormBuilder($student);
		
		// on ajoute les champs que l'on souhaite proposer à l'utilisateur,
		// champs qui vont nous permettre de créer un nouvel étudiant
		$builder->add('firstname'	, TextType::class);
		$builder->add('lastname'	, TextType::class);
		$builder->add('description'	, TextType::class);
		$builder->add('avatar'		, TextType::class);
		$builder->add(
						'save_student', 
						SubmitType::class, 
						array(
							'label' => 'Create Student'
						)
					);
					
		// une fois le formulaire entièrement paramétré, on génère le code
		// qui va nous permettre de créer l'ensemble du formulaire
		// cette méthode retourne un objet qui correspond au formulaire généré.
        $form = $builder->getForm();
		
		
		// on demande à notre formulaire de "gérer la requête entrante, s'il y en a une
		$form->handleRequest($request);

		// puis, si le formulaire a été soumis par l'utilisateur
		// et s'il est valide alors ...
		if ($form->isSubmitted() && $form->isValid()) 
		{
			// $form->getData() nous permet de récupérer les données
			// issues du formulaire, du coup notre objet $student
			// est mis à jour
			$student = $form->getData();
			
			// on rentre l'objet en bdd
			
			// on récupère le manager de doctrine
			$manager = $this->getDoctrine()->getManager();
			// puis on demande à doctrine de stocker
			// l'objet $student, de manière temporaire à l'aide de "persist"
			$manager->persist($student);
			
			// puis on valide l'insertion en base de données
			$manager->flush();

			// puis on redirige vers la route de notre choix
			return $this->redirectToRoute('presentation_route');
		}
		
		
		// on récupère l'instance de l'outil Doctrine
		$obj_doctrine = $this->getDoctrine();
		
		// ensuite on va chercher un objet qui nous permet de retrouver
		// l'ensemble des données qui nous interesse et qui sont stockées
		// en base de données
		$student_repository = $obj_doctrine->getRepository("AppBundle:Student");
		

		// on va chercher l'ensemble des étudiants contenus en bdd
		$list = $student_repository->findAll();
		$selected_student = $student_repository->findOneByFirstname($etudiant);
		
		
		return $this->render(
			'about.html.twig',
			array(
				// on passe au template le code de la vue 
				'cacahuete'=>$form->createView(), 
				'selected_student'=>$selected_student,
				'liste_participants'=>$list
			)
		);
	}
	
}