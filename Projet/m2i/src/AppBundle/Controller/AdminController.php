<?php


namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller 	as Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route 	as Route;
use Symfony\Component\HttpFoundation\Request 				as Request;
use Symfony\Component\HttpFoundation\File\UploadedFile 		as UploadedFile;
use Symfony\Component\HttpFoundation\File\File 				as File;

use Symfony\Component\Form\Extension\Core\Type\TextType 	as TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType as TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType 	as SubmitType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType as PasswordType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType 	as ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType 	as IntegerType;
use Symfony\Component\Form\Extension\Core\Type\FileType 	as FileType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType 	as ButtonType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType 	as HiddenType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType as DateTimeType;

use AppBundle\Entity\Users 									as Users;
use AppBundle\Entity\Articles 								as Articles;
use AppBundle\Entity\Testimony 								as Testimony;



class AdminController extends Controller
{
//*********************************************************************************************************************
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
//*********************************************************************************************************************
	private function _getConnect(Request $request)
	{
		$session = $request->getSession();
					
		return $session->get('connect');;
	}
//*********************************************************************************************************************
	public function admin(Request $request)
	{
		
		
		if( $this->_getConnect($request))
		{	return $this->render('admin.html.twig', array(
			'menu'=>$this->_getMenu()));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array(
						
						));
		}
		
	}
//*********************************************************************************************************************
//*                                               USERS                                                               *
//*********************************************************************************************************************	
	public function users(Request $request)
	{
		
		if( $this->_getConnect($request))
		{
			$manager = $this->getDoctrine()->getManager();
			$query = $manager->createQuery(
			"SELECT u.id, u.firstname,u.lastname, u.avatar,u.age,u.sex,u.mail,u.login,u.password,u.status,u.cv 
			FROM AppBundle:Users u ORDER BY u.lastname,u.firstname"
			);	
						
			$users = $query->getResult();
			
			$user = new Users();
			$builder = $this->createFormBuilder($user);
			$builder->add('firstname', TextType::class);
			$builder->add('lastname', TextType::class);
			$builder->add('avatar', FileType::class);
			$builder->add('age', IntegerType::class);
			$builder->add('sex', ChoiceType::class, array('choices'  => array('Masculin' => 'm','Féminin'=>'f'),'expanded' => true));
			$builder->add('mail', TextType::class);
			$builder->add('login', TextType::class);
			$builder->add('password', TextType::class);
			$builder->add('status', ChoiceType::class, array('choices'  => array('Elève' => 'E','Formateur'=>'F'),'expanded' => true));
			$builder->add('cv', FileType::class);
			$builder->add('ajout_btn', SubmitType::class, array('label'=>'Ajouter'));
			
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
			
			
			if ($form->isSubmitted() && $form->isValid()) 
			{
				
				$user = $form->getData();
				
				if( $user->getAvatar() != null )
				{
					$avatar = $user->getAvatar();
					$filename = $user->getFirstname() . $user->getLastname() . time() .'.'. $avatar->guessExtension();
					$avatar->move( $this->get('kernel')->getRootDir().'/../web/images/',  $filename );
					$user->setAvatar( new File( 'images/' .  $filename) );
					
				}
				
				if( $user->getCv() != null )
				{
					$cv = $user->getCv();
					$filename = $user->getFirstname() . $user->getLastname() . time() .'.'. $cv->guessExtension();
					$cv->move( $this->get('kernel')->getRootDir().'/../web/images/',  $filename );
					$user->setCv( new File( 'images/' .  $filename) );
					
				}
				
				
				$em = $this->getDoctrine()->getManager();
				
				$em->persist($user);
			
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_user_route');
				

			}	
			
			
			return $this->render('users.html.twig', array(
				'menu'=>$this->_getMenu(),
				'users_list'=>$users,
				'form'=>$form->createView()
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************	
	public function modif_users(Request $request,$selected_user)
	{	
	
		if( $this->_getConnect($request))
		{
		
			$obj_doctrine = $this->getDoctrine();
			
			$user_repository = $obj_doctrine->getRepository('AppBundle:Users');
			
			$selected_user = $user_repository->findOneById( $request->get('user_id') );
			
		
			$user = new Users();
			$builder = $this->createFormBuilder($user);
			$builder->add('id'			, HiddenType::class	, array('data'=>$selected_user->getId(), "mapped"=>false	));
			$builder->add('firstname'	, TextType::class	, array('data'=>$selected_user->getFirstName()		));
			$builder->add('lastname'	, TextType::class	, array('data'=>$selected_user->getLastName()		));
			$builder->add('avatar'		, FileType::class	, array('data_class'=>null,'data'=>$selected_user->getAvatar(), 'required'=>false ));
			$builder->add('age'			, IntegerType::class, array('data'=>$selected_user->getAge()));
			$builder->add('sex'			, ChoiceType::class	, array('expanded' => true, 'data'=>$selected_user->getSex(), 'choices'  => array('Masculin' => 'm','Féminin'=>'f') ) ) ;
			$builder->add('mail'		, TextType::class	, array('data'=>$selected_user->getMail()));
			$builder->add('login'		, TextType::class	, array('data'=>$selected_user->getLogin()));
			$builder->add('password'	, TextType::class	, array('data'=>$selected_user->getpassword()));
			$builder->add('status'		, ChoiceType::class	, array('choices'  => array('Elève' => 'E','Formateur'=>'F'),'expanded' => true, 'data'=>$selected_user->getStatus()));
			$builder->add('cv'			, FileType::class	, array('data'=>$selected_user->getCv(),'data_class'=>null , 'required'=>false ));
			$builder->add('valid_btn'	, SubmitType::class	, array('label'=>'Valider'));
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
			
			if ($form->isSubmitted() && $form->isValid()) 
			{
				$user = $form->getData();
				
				
				$selected_user->setFirstname(	$user->getFirstname()	);
				$selected_user->setLastname(	$user->getLastname()	);
				$selected_user->setAge(			$user->getAge()			);
				$selected_user->setSex(			$user->getSex()			);
				$selected_user->setMail(		$user->getMail()		);
				$selected_user->setLogin(		$user->getLogin()		);
				$selected_user->setPassword(	$user->getPassword()	);
				$selected_user->setStatus(		$user->getStatus()		);
				
				if( $user->getCv() != null )
				{
					$cv = $user->getCv();
					$filename = $user->getFirstname() . $user->getLastname() . time() .'.'. $cv->guessExtension();
					$cv->move( $this->get('kernel')->getRootDir().'/../web/images/',  $filename );
					$selected_user->setCv( new File( 'images/' .  $filename) );
				}
				
				if( $user->getAvatar() != null )
				{
					$avatar = $user->getAvatar();
					$filename = $user->getFirstname() . $user->getLastname() . time() .'.'. $avatar->guessExtension();
					$avatar->move( $this->get('kernel')->getRootDir().'/../web/images/',  $filename );
					$selected_user->setAvatar( new File( 'images/' .  $filename) );
				}
				

				$em = $this->getDoctrine()->getManager();
				$em->persist($selected_user);
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_user_route');
			}	
					
			
			
			return $this->render('users_modif.html.twig', array(
				'form'=>$form->createView(),
				'selected_user' => $selected_user
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************	
	public function suppr_users(Request $request,$selected_user)
	{
		
		if( $this->_getConnect($request))
		{
		
			$obj_doctrine = $this->getDoctrine();
			
			$user_repository = $obj_doctrine->getRepository('AppBundle:Users');
			
			$selected_user = $user_repository->findOneById( $request->get('user_id') );	

			
			$user = new Users();
			$builder = $this->createFormBuilder($user);
			$builder->add('id'			, HiddenType::class	, array('data'=>$selected_user->getId(), "mapped"=>false));
			$builder->add('firstname'	, HiddenType::class	, array('data'=>$selected_user->getFirstName()		));
			$builder->add('lastname'	, HiddenType::class	, array('data'=>$selected_user->getLastName()		));
			$builder->add('avatar'		, HiddenType::class	, array('data'=>$selected_user->getAvatar()));
			$builder->add('age'			, HiddenType::class,  array('data'=>$selected_user->getAge()));
			$builder->add('sex'			, HiddenType::class	, array('data'=>$selected_user->getSex()) ) ;
			$builder->add('mail'		, HiddenType::class	, array('data'=>$selected_user->getMail()));
			$builder->add('login'		, HiddenType::class	, array('data'=>$selected_user->getLogin()));
			$builder->add('password'	, HiddenType::class	, array('data'=>$selected_user->getpassword()));
			$builder->add('status'		, HiddenType::class	, array('data'=>$selected_user->getStatus()));
			$builder->add('cv'			, HiddenType::class	, array('data'=>$selected_user->getCv()));
			$builder->add('suppr_btn'	, SubmitType::class	, array('label'=>'Supprimer'));
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
		
			if ($form->isSubmitted() && $form->isValid()) 
			{
				$em = $this->getDoctrine()->getManager();
				$em->remove($selected_user);
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_user_route');
			}
			
			return $this->render('users_suppr.html.twig', array(
				'form'=>$form->createView(),
				'selected_user' => $selected_user
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************
//*                                               ARTICLES                                                            *
//*********************************************************************************************************************	
	public function articles(Request $request)
	{
		if( $this->_getConnect($request))
		{
		
			$manager = $this->getDoctrine()->getManager();
			$query = $manager->createQuery(
			"SELECT a.id, a.category, a.title, a.content, a.creationDate, a.modificationDate, a.img, u.firstname, u.lastname
			FROM AppBundle:Articles a, AppBundle:Users u
			WHERE a.id_user = u.id
			ORDER BY a.category,a.title"
			);	
						
			$articles = $query->getResult();
			
			
			$article = new Articles();
			$builder = $this->createFormBuilder($article);
			$builder->add('category'			, ChoiceType::class, array('choices'  => array(
																							'Description' => 'description',
																							'Participant'=>'participant',
																							'Journée type'=>'journeetype',
																							'Programme de formation'=>'programmeformation',
																							'Détail du programme de formation'=>'detailProgrammeformation',
																							)
			,'expanded' => true));
			$builder->add('title'			, TextType::class);
			$builder->add('img'				, FileType::class);
			$builder->add('content'			, TextareaType::class);
			$builder->add('creationDate'	, DateTimeType::class);
			$builder->add('modificationDate', DateTimeType::class);
			$builder->add('ajout_btn'		, SubmitType::class, array('label'=>'Ajouter'));
			
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
			
			
			if ($form->isSubmitted() && $form->isValid()) 
			{
				
				$article = $form->getData();
				
				if( $article->getImg() != null )
				{
					$img = $article->getImg();
					$filename = $article->getCategory() . $article->getTitle() . time() .'.'. $img->guessExtension();
					$img->move( $this->get('kernel')->getRootDir().'/../web/images/',  $filename );
					$article->setImg( new File( 'images/' .  $filename) );
					
				}
				
				
				$session = $request->getSession();
				
				$id_user = $session->get('id_user');
				
				$article->setId_user($id_user);		
				
				$em = $this->getDoctrine()->getManager();
				
				$em->persist($article);
			
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_article_route');
				

			}	
			
			
			return $this->render('articles.html.twig', array(
				'articles_list'=>$articles,
				'form'=>$form->createView()
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************	
	public function modif_articles(Request $request,$selected_article)
	{
		if( $this->_getConnect($request))
		{
		
		
			$obj_doctrine = $this->getDoctrine();
			
			$article_repository = $obj_doctrine->getRepository('AppBundle:Articles');
			
			$selected_article = $article_repository->findOneById( $request->get('article_id') );
		
			$article = new Articles();
			$builder = $this->createFormBuilder($article);
			$builder->add('id'					, HiddenType::class		, array('data'=>$selected_article->getId(), "mapped"=>false	));
			$builder->add('category'			, ChoiceType::class, array('choices'  => array(
																							'Description' => 'description',
																							'Participant'=>'participant',
																							'Journée type'=>'journeetype',
																							'Programme de formation'=>'programmeformation',
																							'Détail du programme de formation'=>'detailProgrammeformation',
																							)
			,'expanded' => true,'data'=>$selected_article->getCategory()));
			$builder->add('title'    			, TextType::class		, array('data'=>$selected_article->getTitle()		));
			$builder->add('img'    				, FileType::class		, array('data'=>$selected_article->getImg(), 'required'=>false ,'data_class'=>null		));
			$builder->add('content'				, TextareaType::class	, array('data'=>$selected_article->getContent()));
			$builder->add('creation_date'		, DateTimeType::class	, array('data'=>$selected_article->getCreationDate()));
			$builder->add('Modification_date'	, DateTimeType::class	, array('data'=>$selected_article->getModificationDate()));
			$builder->add('valid_btn'			, SubmitType::class		, array('label'=>'Valider'));
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
			
			if ($form->isSubmitted() && $form->isValid()) 
			{
				$article = $form->getData();
				
				
				$selected_article->setCategory(				$article->getCategory()	);
				$selected_article->setTitle(				$article->getTitle()	);
				$selected_article->setContent(				$article->getContent()			);
				$selected_article->setCreationDate(			$article->getCreationDate()			);
				$selected_article->setModificationDate(		$article->getModificationDate()		);
				
				if( $article->getImg() != null )
				{
					$img= $article->getImg();
					$filename = $article->getCategory() . $article->getTitle() . time() .'.'. $img->guessExtension();
					$img->move( $this->get('kernel')->getRootDir().'/../web/images/',  $filename );
					$selected_article->setImg( new File( 'images/' .  $filename) );
				}
				
				$session = $request->getSession();
				
				$id_user = $session->get('id_user');
				
				$selected_article->setId_user($id_user);
							
				$em = $this->getDoctrine()->getManager();
				$em->persist($selected_article);
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_article_route');
			}	
					
			
			
			return $this->render('articles_modif.html.twig', array(
				'form'=>$form->createView(),
				'selected_article' => $selected_article
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************	
	public function suppr_articles(Request $request,$selected_article)
	{
		
		if( $this->_getConnect($request))
		{
		
			$obj_doctrine = $this->getDoctrine();
			
			$article_repository = $obj_doctrine->getRepository('AppBundle:Articles');
			
			$selected_article = $article_repository->findOneById( $request->get('article_id') );	

			$article = new Articles();
			$builder = $this->createFormBuilder($article);
			$builder->add('id'					, HiddenType::class		, array('data'=>$selected_article->getId(), "mapped"=>false	));
			$builder->add('category'			, HiddenType::class		, array('data'=>$selected_article->getCategory()		));
			$builder->add('title'    			, HiddenType::class		, array('data'=>$selected_article->getTitle()		));
			$builder->add('content'				, HiddenType::class		, array('data'=>$selected_article->getContent()));
			$builder->add('suppr_btn'			, SubmitType::class		, array('label'=>'Supprimer'));
			
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
		
			if ($form->isSubmitted() && $form->isValid()) 
			{
				$em = $this->getDoctrine()->getManager();
				$em->remove($selected_article);
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_article_route');
			}
			
			return $this->render('articles_suppr.html.twig', array(
				'form'=>$form->createView(),
				'selected_article' => $selected_article
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************
//*                                               TESTIMONY                                                           *
//*********************************************************************************************************************	
	public function testimonys(Request $request)
	{
		if( $this->_getConnect($request))
		{
		
			$manager = $this->getDoctrine()->getManager();
			$query = $manager->createQuery(
			"SELECT t.id, t.context, t.msg, t.creationDate, t.modificationDate, u.firstname, u.lastname
			FROM AppBundle:Testimony t, AppBundle:Users u
			WHERE t.idUser = u.id
			ORDER BY t.context,t.creationDate,t.modificationDate"
			);	
						
			$testimonys = $query->getResult();
			
			$testimony = new Testimony();
			$builder = $this->createFormBuilder($testimony);
			$builder->add('context', ChoiceType::class, array('choices'  => array('Témoignage' => 't','Forum'=>'f'),'expanded' => true));
			$builder->add('msg', TextareaType::class);
			$builder->add('creationDate', DateTimeType::class);
			$builder->add('modificationDate', DateTimeType::class);
			$builder->add('ajout_btn', SubmitType::class, array('label'=>'Ajouter'));
			
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
			
			
			if ($form->isSubmitted() && $form->isValid()) 
			{
				
				$testimony = $form->getData();
				
				$session = $request->getSession();
				
				$id_user = $session->get('id_user');
				
				$testimony->setIdUser($id_user);		
				
				$em = $this->getDoctrine()->getManager();
				
				$em->persist($testimony);
			
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_testimony_route');
				

			}	
			
			
			return $this->render('testimonys.html.twig', array(
				'testimonys_list'=>$testimonys,
				'form'=>$form->createView()
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************	
	public function modif_testimonys(Request $request,$selected_testimony)
	{
		
		if( $this->_getConnect($request))
		{
		
			$obj_doctrine = $this->getDoctrine();
			
			$testimony_repository = $obj_doctrine->getRepository('AppBundle:Testimony');
			
			$selected_testimony = $testimony_repository->findOneById( $request->get('testimony_id') );
		
			$testimony = new Testimony();
			$builder = $this->createFormBuilder($testimony);
			$builder->add('id'					, HiddenType::class		, array('data'=>$selected_testimony->getId(), "mapped"=>false	));
			$builder->add('context'				, ChoiceType::class		, array('expanded' => true, 'data'=>$selected_testimony->getContext(), 'choices'  => array('Témoignage' => 't','Forum'=>'f') ) ) ;
			$builder->add('msg'					, TextareaType::class	, array('data'=>$selected_testimony->getMsg()));
			$builder->add('creation_date'		, DateTimeType::class	, array('data'=>$selected_testimony->getCreationDate()));
			$builder->add('Modification_date'	, DateTimeType::class	, array('data'=>$selected_testimony->getModificationDate()));
			$builder->add('valid_btn'			, SubmitType::class		, array('label'=>'Valider'));
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
			
			if ($form->isSubmitted() && $form->isValid()) 
			{
				$testimony = $form->getData();
				
				
				$selected_testimony->setContext(				$testimony->getContext()	);
				$selected_testimony->setMsg(					$testimony->getMsg()			);
				$selected_testimony->setCreationDate(			$testimony->getCreationDate()			);
				$selected_testimony->setModificationDate(		$testimony->getModificationDate()		);
				
				$session = $request->getSession();
				
				$id_user = $session->get('id_user');
				
				$selected_testimony->setIdUser($id_user);
							
				$em = $this->getDoctrine()->getManager();
				$em->persist($selected_testimony);
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_testimony_route');
			}	
					
			
			
			return $this->render('testimonys_modif.html.twig', array(
				'form'=>$form->createView(),
				'selected_testimony' => $selected_testimony
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************	
	public function suppr_testimonys(Request $request,$selected_testimony)
	{
		
		if( $this->_getConnect($request))
		{
		
			$obj_doctrine = $this->getDoctrine();
			
			$testimony_repository = $obj_doctrine->getRepository('AppBundle:Testimony');
			
			$selected_testimony = $testimony_repository->findOneById( $request->get('testimony_id') );	

			$testimony = new testimony();
			$builder = $this->createFormBuilder($testimony);
			$builder->add('id'					, HiddenType::class		, array('data'=>$selected_testimony->getId(), "mapped"=>false	));
			$builder->add('context'				, HiddenType::class		, array('data'=>$selected_testimony->getContext()		));
			$builder->add('msg'    				, HiddenType::class		, array('data'=>$selected_testimony->getMsg()		));
			$builder->add('suppr_btn'			, SubmitType::class		, array('label'=>'Supprimer'));
			
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
		
			if ($form->isSubmitted() && $form->isValid()) 
			{
				$em = $this->getDoctrine()->getManager();
				$em->remove($selected_testimony);
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_testimony_route');
			}
			
			return $this->render('testimonys_suppr.html.twig', array(
				'form'=>$form->createView(),
				'selected_testimony' => $selected_testimony
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************
//*                                               FORUM                                                               *
//*********************************************************************************************************************	
	public function forums(Request $request)
	{
		
		if( $this->_getConnect($request))
		{
		
			$manager = $this->getDoctrine()->getManager();
			$query = $manager->createQuery(
			"SELECT t.id, t.context, t.msg, t.creationDate, t.modificationDate, u.firstname, u.lastname
			FROM AppBundle:Testimony t, AppBundle:Users u
			WHERE t.idUser = u.id and t.context = 'f'
			ORDER BY t.creationDate desc"
			)
			->setMaxResults(20);	
						
			$testimonys = $query->getResult();
			
			$testimony = new Testimony();
			$builder = $this->createFormBuilder($testimony);
			$builder->add('msg', TextareaType::class);
			$builder->add('envoi_btn', SubmitType::class, array('label'=>'Envoyer'));
			
			
			$form = $builder->getForm();
			
			$form->handleRequest($request);
			
			
			if ($form->isSubmitted() && $form->isValid()) 
			{
				
				$testimony = $form->getData();
				
				$session = $request->getSession();
				
				$id_user = $session->get('id_user');
				
				$testimony->setIdUser($id_user);
				
				$testimony->setContext('f');
				
				$date = new \Datetime();
				
				$testimony->setCreationDate($date);
				$testimony->setModificationDate($date);
				
				
				$em = $this->getDoctrine()->getManager();
				
				$em->persist($testimony);
			
				$em->flush();
				
				return $this->redirectToRoute('m2iprojet_admin_forum_route');
				

			}	
			
			
			return $this->render('forum.html.twig', array(
				'testimonys_list'=>$testimonys,
				'form'=>$form->createView()
			));
		}
		else
		{
			return $this->render('connexion_failed.html.twig',array());
		}
	}
//*********************************************************************************************************************	
}