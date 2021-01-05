<?php

namespace App\Services;

use App\Audition;
use App\Channel;
use App\Repositories\AuditionRepository;
use App\Repositories\ChannelRepository;
use Illuminate\Support\Collection;

class ChannelService implements IChannelService
{
    /**
     * @var ChannelRepository
     */
    private $repository;

    /**
     * @var AuditionRepository
     */
    private $auditionRepository;

    /**
     * @var DateRangeService
     */
    private $dateRangeService;

    /**
     * @var ChannelRepository $repository
     */
    public function __construct(ChannelRepository $repository, AuditionRepository $auditionRepository, DateRangeService $dateRangeService)
    {
        $this->repository = $repository;
        $this->auditionRepository = $auditionRepository;
        $this->dateRangeService = $dateRangeService;
    }

    /**
     * @param int $offset
     * @param int $amountOfChannels
     * @param string $date
     * @return Collection
     */
    public function getChannelsWithAuditions(int $offset, int $amountOfChannels, string $date): Collection
    {
        $channels = $this->getChannels($offset, $amountOfChannels);
        $auditions = $this->getAuditionsForChannels($channels, $date);

        return $this->channelsWithAuditons($channels, $auditions);
    }

    /**
     * @param int $offset
     * @param int $limit
     * @return Collection
     */
    public function getChannels(int $offset, int $limit): Collection
    {
        return $this->repository
            ->getChannelsLimitedBy($offset, $limit);
    }

    /**
     * @param Collection $channels
     * @param string $date
     * @return Collection
     */
    public function getAuditionsForChannels(Collection $channels, string $date): Collection
    {
        $dateRange = $this->dateRangeService->getRangeFromDate($date);

        return $this->auditionRepository
            ->getAuditionsForChannelsBetweenDates($channels->pluck('id'), $dateRange);
    }

    /**
     * @param Collection $channels
     * @param Collection $auditions
     * @return Collection
     */
    public function channelsWithAuditons(Collection $channels, Collection $auditions): Collection
    {
        $tab = [];

        $auditions->each(function(Audition $audition) use (&$tab) {
            $tab[$audition->channel_id][] = $audition;
        });

        $channels->each(function(Channel $channel) use($tab) {
            $channel->auditions = $tab[$channel->id] ?? [];
        });

        return $channels;
    }

    /**
     * @var Channel $channel
     * @var string $date Data środka przedziału
     * @return Collection
     */
    public function getChannelWithAuditions(Channel $channel, string $date): Channel
    {
        $dateRange = $this->dateRangeService->getRangeFromDate($date);

        $channel->auditions = $this->auditionRepository
            ->getAuditionsForChannelBetweenDates($channel->id, $dateRange);

        return $channel;
    }

    /**
     * @var string $phrase Szukana fraza
     * @return Collection
     */
    public function searchChannelsThatMatchPhrase(string $phrase): Collection
    {
        return $this->repository->matchPhrase($phrase);
    }
}