<?php

namespace Tests\Unit;

use App\Channel;
use Tests\TestCase;

class GetChannelAuditionsListTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCanGetListOfAllChannelAuditions()
    {
        $channelId = Channel::all()->first()->id;
        $response = $this->get('/api/audition/'.$channelId.'/');
        $response->assertOk();

        $jsonData = $response->json();
        
        $this->assertIsArray($jsonData);
        $this->assertArrayHasKey(0, $jsonData);
        $this->assertIsArray($jsonData[0]);
        $this->assertArrayHasKey('id', $jsonData[0]);
        $this->assertArrayHasKey('title', $jsonData[0]);
        $this->assertArrayHasKey('description', $jsonData[0]);
        $this->assertArrayHasKey('duration', $jsonData[0]);
    }
}
