<?php

use App\Audition;
use Illuminate\Database\Seeder;

class AuditionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 1000; $i++) {
            factory(Audition::class)->create();
        }
    }
}