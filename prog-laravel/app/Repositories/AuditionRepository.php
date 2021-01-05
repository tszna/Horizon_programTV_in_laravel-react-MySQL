<?php

namespace App\Repositories;

use App\Audition;
use Illuminate\Support\Collection;

class AuditionRepository
{
    
    /**
     * @param iterable $channelIds Id kanałów
     * @param iterable $dateRange
     * @return Collection
     */
    public function getAuditionsForChannelsBetweenDates(iterable $channelIds, iterable $dateRange): Collection
    {
        return Audition::query()
            ->whereIn('channel_id', $channelIds)
            ->where('date_end', '>=', reset($dateRange))
            ->where('date_start', '<=', end($dateRange))
            ->get();
    }
    
    /**
     * @param int $channelId Id kanału
     * @param iterable $dateRange
     * @return Collection
     */
    public function getAuditionsForChannelBetweenDates(int $channelId, iterable $dateRange): Collection
    {
        return Audition::query()
            ->where('channel_id', '=', $channelId)
            ->where('date_end', '>=', reset($dateRange))
            ->where('date_start', '<=', end($dateRange))
            ->get();
    }

    /**
     * @var string $phrase
     */
    public function matchPhrase(string $phrase): Collection
    {
        return Audition::query()
            ->where('date_start', '>', date('Y-m-d H:i:s'))
            ->where('date_start', '<', date('Y-m-d H:i:s', time() + (86400 * 7)))
            ->where(function ($query) use ($phrase) {
                $query
                    ->where('title', 'LIKE', "%$phrase%");
                    // ->orWhere('description', 'LIKE', "%$phrase%");
            })
            ->orderBy('date_start')
            ->get();
    }
}