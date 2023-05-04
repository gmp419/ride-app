<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Driver extends Model
{
    use SoftDeletes;
    protected $guarded = [];

    public function trips() : HasMany
    {
        return $this->hasMany(Trip::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
