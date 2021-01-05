<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Channel;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Storage;

$factory->define(Channel::class, function (Faker $faker) {
    Storage::makeDirectory("public".DIRECTORY_SEPARATOR."channel_avatars");
    $path = storage_path("app".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR."channel_avatars");
    // $image = imagecreatetruecolor(200, 200);
    $imageName = $path.DIRECTORY_SEPARATOR.$faker->word.".png";
    // imagepng($image, $imageName);
    $content = file_get_contents('https://picsum.photos/98/78');
    file_put_contents($imageName, $content);

    return [
        'name' => $faker->unique()->company,
        'avatar' => substr($imageName, strpos($imageName, "storage".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."public".DIRECTORY_SEPARATOR) + 19),
    ];
});
