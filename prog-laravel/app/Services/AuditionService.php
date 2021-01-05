<?php

namespace App\Services;

use App\Audition;
use App\Channel;
use App\Repositories\AuditionRepository;
use Illuminate\Support\Collection;

class AuditionService
{
    /**
     * @var AuditionRepository
     */
    private $repository;

    /**
     * @var DateRangeService
     */
    private $dateRangeService;

    /**
     * @var AuditionRepository $repository
     */
    public function __construct(AuditionRepository $repository, DateRangeService $dateRangeService)
    {
        $this->repository = $repository;
        $this->dateRangeService = $dateRangeService;
    }

    /**
     * @var Channel $channel
     * @var string $date
     * @return Collection
     */
    public function getAuditionsForChannel(Channel $channel, string $date): Collection
    {
        $dateRange = $this->dateRangeService->getRangeFromDate($date);

        return $this->repository
            ->getAuditionsForChannelsBetweenDates([$channel->id], $dateRange);
    }

    /**
     * @var string $phrase Szukana fraza
     * @return Collection
     */
    public function searchAuditionsThatMatchPhrase(string $phrase): Collection
    {
        return $this->repository->matchPhrase($phrase);
    }

    /**
     * @param Audition $audition
     * @return string
     */
    public function auditionToCsv(Audition $audition): string
    {
        $str = 
            "Tytuł;" . $audition->title . "\n" .
            "Opis;" . $audition->description . "\n" .
            "Data emisji;" . $audition->date_start . "\n" .
            "Kanał;" . $audition->channel->name . "\n";

        return $str;
    }
}