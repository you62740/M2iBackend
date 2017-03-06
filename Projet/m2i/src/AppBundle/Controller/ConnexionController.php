<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller as Controller;
use Symfony\Component\HttpFoundation\Response as Response;
use Symfony\Component\HttpFoundation\Request as Request;

use AppBundle\Entity\Users as Users;
use AppBundle\Entity\Testimony as Testimony;
use Symfony\Component\Form\Extension\Core\Type\TextType as TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType as SubmitType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType as PasswordType;





class ConnexionController extends Controller
{
	
	
	private function _getMenu()
	{
		$articles_url 		= $this->generateUrl('m2iprojet_admin_article_route'		, array()	);
		$forum_url 			= $this->generateUrl('m2iprojet_admin_forum_route'			, array()	);
		$users_url 			= $this->generateUrl('m2iprojet_admin_user_route'			, array()	);
		$testimony_url 		= $this->generateUrl('m2iprojet_admin_testimony_route'		, array()	);
				
		$menu = array( 	
						'articles'=>$articles_url,
						'forum'=>$forum_url,
						'users'=>$users_url,
						'testimony'=>$testimony_url
					);
					
		return $menu;
	}
	
	
	public function connect(Request $request)
	{
		
		$user = new Users();
		
		$builder = $this->createFormBuilder($user);
		
		$builder->add('login', TextType::class);
		$builder->add('password', PasswordType::class);
		$builder->add('login_btn', SubmitType::class, array('label'=>'Connexion'));
		
		$builder->setAction($this->generateUrl('m2iprojet_connexion_route'));
		
		$form = $builder->getForm();
		
		
		return $this->render('connect.html.twig',array('form'=>$form->createView()));
	}
	
	
	
	
  public function connexion(Request $request)
	{
		
		$form = ($request->request->get('form'));
		$login = $form['login'];
		$password = $form['password'];
		
		$session = $request->getSession();
		
		// vérifier si l'utilisateur qui correspond aux login + password existe en bdd
		$manager = $this->getDoctrine()->getManager();
		$query = $manager->createQuery(
		"SELECT count(u.login) as total FROM AppBundle:Users u
		WHERE u.login = :login and u.password = :password"
		)->setParameter('login', $login)
		->setParameter('password', $password);
		
		$user = $query->getResult();
		
		$connect = false;
		
		if($user[0]['total'] != '0'){$connect = true;}
		

		
		if($connect)
		{
					
			$session->set('login', $login);
			$session->set('password', $password);
			
			// Récupération de id_user 
		
			$manager = $this->getDoctrine()->getManager();
			$query = $manager->createQuery(
			"SELECT u.id as id_user FROM AppBundle:Users u
			WHERE u.login = :login and u.password = :password"
			)->setParameter('login', $login)
			->setParameter('password', $password);
			
			$user = $query->getResult();
			
			$id_user = $user[0]['id_user'];
			
			$session->set('id_user', $id_user);
			$session->set('connect', true);
			
			return $this->redirectToRoute('m2iprojet_admin_route');
			
			/*
					return $this->render('admin.html.twig',array(
						'login'=>$login,
						'menu'=>$this->_getMenu()
						));
			*/
		}
		else
		{
			$session->set('connect', false);
			
			return $this->render('connexion_failed.html.twig',array(
						'login'=>$login
						));
		}	

	}
	
	 public function forum()
	{
		return $this->render('forum.html.twig',array(
						
						));
	}
	
}