<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller as Controller;
use Symfony\Component\HttpFoundation\Response as Response;
use Symfony\Component\HttpFoundation\JsonResponse as JsonResponse;

class WebServiceController extends Controller
{
   
    public function displayArticleDefault()
	{
		$manager = $this->getDoctrine()->getManager();
		$query = $manager->createQuery(
			"SELECT a.category,a.title,a.content,a.creationDate,a.modificationDate,a.img,u.firstname,u.lastname 
			FROM AppBundle:Articles a,AppBundle:Users u
			WHERE a.id_user = u.id and a.category=:category and a.title=:title
			ORDER BY a.modificationDate,a.creationDate,a.title ASC"
		)->setParameter('category', 'description')
		->setParameter('title', 'm2i');

		$tabArticles = $query->getResult();
				
		
		return new JsonResponse($tabArticles);
	}
	
	
	
	public function displayArticle($category)
	{
		$manager = $this->getDoctrine()->getManager();
		$query = $manager->createQuery(
			"SELECT a.category,a.title,a.content,a.creationDate,a.modificationDate,a.img,u.firstname,u.lastname 
			FROM AppBundle:Articles a,AppBundle:Users u
			WHERE a.id_user = u.id and a.category=:category 
			ORDER BY a.modificationDate,a.creationDate,a.title ASC"
		)->setParameter('category', $category)
		->setMaxResults(20);

		$tabArticles = $query->getResult();
				
		
		return new JsonResponse($tabArticles);
	}
	
	public function liste()
	{
		$manager = $this->getDoctrine()->getManager();
		$query = $manager->createQuery(
			"SELECT u.firstname,u.lastname,u.avatar,u.age,u.sex,u.mail,u.cv
			FROM AppBundle:Users u
			ORDER BY u.lastname,u.firstname ASC"
		)->setMaxResults(20);

		$tabUsers = $query->getResult();
				
		
		return new JsonResponse($tabUsers);
	}
	
	public function livreor()
	{
		$manager = $this->getDoctrine()->getManager();
		$query = $manager->createQuery(
			"SELECT t.msg,t.creationDate,t.modificationDate,u.firstname,u.lastname
			FROM AppBundle:Testimony t,AppBundle:Users u
			WHERE t.idUser = u.id
			ORDER BY t.creationDate,t.modificationDate ASC"
		)->setMaxResults(20);

		$tabUsers = $query->getResult();
				
		
		return new JsonResponse($tabUsers);
	}
	
}