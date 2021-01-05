<?php

namespace Tests\Unit;

use Tests\TestCase;

class GetChannelListTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCanGetListOfAllChannels()
    {
        $response = $this->get('/api/channel/0/10');
        $response->assertOk();

        $jsonData = $response->json();

        $this->assertIsArray($jsonData);
        $this->assertCount(10, $jsonData);
        $this->assertArrayHasKey(0, $jsonData);
        $this->assertIsArray($jsonData[0]);
        $this->assertArrayHasKey('id', $jsonData[0]);
        $this->assertArrayHasKey('name', $jsonData[0]);
        $this->assertArrayHasKey('avatar', $jsonData[0]);
    }
}
