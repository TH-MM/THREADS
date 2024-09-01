<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});


Route::middleware('auth:sanctum')->post('/update' , [UserController::class , 'update']);


require __DIR__.'/auth.php';
