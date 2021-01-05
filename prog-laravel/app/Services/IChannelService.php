<?php

namespace App\Services;

use App\Channel;
use Illuminate\Support\Collection;

interface IChannelService
{
    /**
     * @var int $offset
     * @var int $amountOfChannels
     * @var string $date Data środka przedziału
     * @return Collection
     */
    public function getChannelsWithAuditions(int $offset, int $amountOfChannels, string $date): Collection;

    /**
     * @var Channel $channel
     * @var string $date Data środka przedziału
     * @return Collection
     */
    public function getChannelWithAuditions(Channel $channel, string $date): Channel;

    /**
     * @var string $phrase Szukana fraza
     * @return Collection
     */
    public function searchChannelsThatMatchPhrase(string $phrase): Collection;
}