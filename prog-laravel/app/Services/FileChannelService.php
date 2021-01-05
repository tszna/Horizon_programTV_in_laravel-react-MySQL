<?php

namespace App\Services;

use App\Channel;
use App\Repositories\ChannelRepository;
use Illuminate\Support\Collection;

class FileChannelService implements IChannelService
{
    /**
     * @var int $offset
     * @var int $amountOfChannels
     * @return Collection
     */
    public function getChannelsWithAuditions(int $offset, int $amountOfChannels): Collection
    {
        return Collection::make(factory(Channel::class, 5)->make());
    }
}