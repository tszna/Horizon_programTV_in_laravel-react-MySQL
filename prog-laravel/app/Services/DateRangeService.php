<?php

namespace App\Services;


class DateRangeService
{
    /**
     * @param string $date Data w formacie tekstowym (np. '2020-01-01 20:05:00')
     * @return array Tablica zawierająca dwa stringi'y: początek przedziału i koniec przedziału
     */
    public function getRangeFromDate(string $date): array
    {
        $timestamp = strtotime($date);

        $from   = date('Y-m-d H:i:s', $timestamp - (1.5 * 60 * 60));
        $to     = date('Y-m-d H:i:s', $timestamp + (3 * 60 * 60));

        return [$from, $to];
    }
}