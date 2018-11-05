<?php
// tests/LoginTest.php

namespace App\Tests;

use App\Controller\LoginController;
use PHPUnit\Framework\TestCase;

class LoginTest extends TestCase
{
    public function testAdd()
    {
        $calculator = new Calculator();
        $result = $calculator->add(30, 12);

        // assert that your calculator added the numbers correctly!
        $this->assertEquals(42, $result);
    }
}

?>