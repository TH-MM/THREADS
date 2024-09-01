<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "content",
        "image",
        "likes_count",
        "comments_count",
    ];

    public function user() : BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function likes():HasMany
    {
        return $this->hasMany(Like::class);
    }
}
