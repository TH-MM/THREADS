<?php

use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user()->load(['posts' => function ($query) {
        $query->with('likes')->orderBy('created_at', 'desc');
    }]);
});
Route::get('users' , [UserController::class , "allUsers"]);
// Route::get('user/{id}' , [UserController::class , "user"]);

Route::get("/posts" , [PostController::class , 'index']);
Route::middleware(['auth:sanctum'])->post("/posts" , [PostController::class , 'store']);

Route::get("/likes" , [LikeController::class , 'index']);
Route::middleware(['auth:sanctum'])->post("/like/{postId}" , [LikeController::class , 'like']);
