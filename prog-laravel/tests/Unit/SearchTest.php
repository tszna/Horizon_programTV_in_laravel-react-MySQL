<?php

namespace Tests\Unit;

use Illuminate\Http\JsonResponse;
use Tests\TestCase;

class SearchTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCanSearchForPhrase()
    {
        $phrase = 'a';
        $response = $this->get("/api/search/$phrase");
        $response->assertOk();

        $jsonData = $response->json();

        $this->assertIsArray($jsonData);
        $this->assertGreaterThan(0, count($jsonData));
        $this->assertIsArray($jsonData[0]);
        $this->assertArrayHasKey('id', $jsonData[0]);
        $this->assertArrayHasKey('type', $jsonData[0]);

        end($jsonData);

        $lastElement = current($jsonData);
        $this->assertIsArray($lastElement);
        $this->assertEquals('audition', $lastElement['type']);
        $this->assertArrayHasKey('channel', $lastElement);
    }

    /**
     * @return void
     */
    public function testCannotSearchForEmptyPhrase()
    {
        $phrase = '';
        $response = $this->get("/api/search/$phrase");
        $response->assertStatus(JsonResponse::HTTP_BAD_REQUEST);
    }
}
