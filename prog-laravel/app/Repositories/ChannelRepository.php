<?php

namespace App\Repositories;

use App\Channel;
use Illuminate\Database\Eloquent\Collection;

class ChannelRepository
{
    /**
     * @return Collection
     */
    public function getChannelsLimitedBy(int $startIndex, int $amount): Collection
    {
        return Channel::query()
            ->offset($startIndex)
            ->limit($amount)
            ->get();
    }

    /**
     * @var string $phrase
     */
    public function matchPhrase(string $phrase): Collection
    {
        return Channel::query()
            ->where('name', 'LIKE', "%$phrase%")
            ->get();
    }
}