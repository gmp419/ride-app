<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $guarded = [];

    protected $hidden = [
        'login_code',
        'remember_token',
    ];

    public function routeNotificationForTwilio()
    {
        return $this->phone;
    }

    public function driver() : HasOne
    {
        return $this->hasOne(Driver::class);
    }

    public function trips() : HasMany
    {
        return $this->hasMany(Trip::class);
    }
}
