<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $title
 * @property string $description
 * @property string $date_start
 * @property string $date_end
 * @property int $duration
 * @property int $channel_id
 * @property Channel $channel
 */
class Audition extends Model
{
    protected $fillable = [
        "title",
        "description",
        "date_start",
        "date_end",
        "duration",
        "channel_id",
    ];

    public function channel(): BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }
}