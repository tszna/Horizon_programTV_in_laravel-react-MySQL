<?php

namespace App\Providers;

use App\Services\ChannelService;
use App\Services\IChannelService;
use Illuminate\Support\ServiceProvider;

class ServicesProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(IChannelService::class, ChannelService::class);
    }
}
