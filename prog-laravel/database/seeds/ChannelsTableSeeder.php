<?php

use App\Channel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class ChannelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Storage::deleteDirectory("public\channel_avatars");
        Schema::disableForeignKeyConstraints();
        Channel::truncate();
        Schema::enableForeignKeyConstraints();

        factory(Channel::class, 20)->create();
    }
}
