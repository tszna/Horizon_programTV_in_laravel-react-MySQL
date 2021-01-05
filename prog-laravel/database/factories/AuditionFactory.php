<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Audition;
use Faker\Generator as Faker;

$factory->define(Audition::class, function (Faker $faker) {
    $channelId = $faker->numberBetween(1, 20);

    $lastChannelAuditon = Audition::query()
        ->where('channel_id', '=', $channelId)
        ->orderBy('date_start', 'desc')
        ->get()
        ->first();

    if ($lastChannelAuditon) {
        $timeOfComercialsBetweenAuditions = 0;//$faker->randomElement([5, 20]) * 60;
        $lastChannelAuditonDateEnd = strtotime($lastChannelAuditon->date_end);

        $dateStart = date(
            "Y-m-d H:i:00", 
            $lastChannelAuditonDateEnd + $timeOfComercialsBetweenAuditions
        );
    } else {
        $dateStart = date("Y-m-d H:i:00", intval((time() - 36000) / 300) * 300);
    }
    
    $duration = intval($faker->numberBetween(30, 120) / 5) * 5;

    $timeOfComercials = 0;//$faker->randomElement([5, 10, 15, 20]) * 60;

    $dateEnd = date(
        "Y-m-d H:i:00", 
        intval((strtotime($dateStart) + $timeOfComercials + ($duration * 60)) / 300) * 300
    ); 

    return [
        'title' => $faker->words($faker->numberBetween(1, 5), true),
        'description' => $faker->paragraph,
        'date_start' => $dateStart,
        'date_end' => $dateEnd,
        'duration' => $duration,
        'channel_id' => $channelId,
    ];
});
