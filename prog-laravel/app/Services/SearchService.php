<?php

namespace App\Services;

use App\Audition;
use App\Channel;

class SearchService
{
    /**
     * @var IChannelService
     */
    protected $channelService;

    /**
     * @var AuditionService
     */
    protected $auditionService;

    public function __construct(IChannelService $channelService, AuditionService $auditionService) 
    {
        $this->channelService = $channelService;
        $this->auditionService = $auditionService;
    }

    /**
     * @param string $phrase Fraza do odszukania
     * @return array Tablica zawierająca dwa stringi'y: początek przedziału i koniec przedziału
     */
    public function searchForPhrase(string $phrase): array
    {
        $channelResults = $this->channelService
            ->searchChannelsThatMatchPhrase($phrase)
            ->map(function (Channel $channel) {
                $channel['type'] = 'channel';

                return $channel;
            });
            
        $auditionResults = $this->auditionService
            ->searchAuditionsThatMatchPhrase($phrase)
            ->load('channel')
            ->map(function (Audition $audition) {
                $audition['type'] = 'audition';
                
                return $audition;
            });

        return array_merge($channelResults->toArray(), $auditionResults->toArray());
    }
}