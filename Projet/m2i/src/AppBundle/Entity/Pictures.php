<?php

namespace AppBundle\Entity;

/**
 * Pictures
 */
class Pictures
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

}

