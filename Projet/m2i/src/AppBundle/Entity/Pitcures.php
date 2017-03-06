<?php

namespace AppBundle\Entity;

/**
 * Pitcures
 */
class Pitcures
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $img;

    /**
     * @var int
     */
    private $idArticle;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set img
     *
     * @param string $img
     *
     * @return Pitcures
     */
    public function setImg($img)
    {
        $this->img = $img;

        return $this;
    }

    /**
     * Get img
     *
     * @return string
     */
    public function getImg()
    {
        return $this->img;
    }

    /**
     * Set idArticle
     *
     * @param integer $idArticle
     *
     * @return Pitcures
     */
    public function setIdArticle($idArticle)
    {
        $this->idArticle = $idArticle;

        return $this;
    }

    /**
     * Get idArticle
     *
     * @return int
     */
    public function getIdArticle()
    {
        return $this->idArticle;
    }
}

