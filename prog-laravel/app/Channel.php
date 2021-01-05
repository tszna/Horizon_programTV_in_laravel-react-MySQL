<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * @property string $name
 * @property string $avatar
 * @property Collection $auditions
 */
class Channel extends Model
{
    protected $table = 'channels';

    protected $fillable = [
        "name",
        "avatar",
    ];

    public function auditions()
    {
        return $this->hasMany(Audition::class, 'channel_id', 'id');
    }
}
