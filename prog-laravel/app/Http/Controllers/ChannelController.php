<?php

namespace App\Http\Controllers;

use App\Channel;
use App\Services\ChannelService;
use App\Services\IChannelService;
use Illuminate\Http\JsonResponse;

class ChannelController extends Controller
{
    /**
     * @var IChannelService
     */
    private $service;

    /**
     * @var IChannelService $service
     */
    public function __construct(IChannelService $service)
    {
        $this->service = $service;
    }

    /**
     * @param int $offset
     * @param int $amountOfChannels
     * @param string|null $date
     * @return JsonResponse
     */
    public function getJsonList(int $offset, int $amountOfChannels, string $date = null): JsonResponse
    {
        if (is_null($date)) {
            $time  = time();
        } else {
            $time = $date;
        }

        $date = date('Y-m-d H:i:s', $time);

        $channels = $this->service->getChannelsWithAuditions($offset, $amountOfChannels, $date);

        return response()->json($channels);
    }

    /**
     * @param Channel $channel
     * @param string|null $date
     * @return JsonResponse
     */
    public function getJsonChannel(Channel $channel, string $date = null): JsonResponse
    {
        if (is_null($date)) {
            $time  = time();
        } else {
            $time = $date;
        }

        $date = date('Y-m-d H:i:s', $time);

        $channel = $this->service->getChannelWithAuditions($channel, $date);

        return response()->json($channel);
    }
}
