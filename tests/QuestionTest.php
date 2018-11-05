<?php
// tests/QuestionTest.php

namespace App\Tests;

use App\Controller\QuestionController;
use PHPUnit\Framework\TestCase;

class QuestionTest extends TestCase
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