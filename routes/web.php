<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
// check login status
Route::get('/is_logged_in', function(){
    $user = Auth::user();
    if ($user) {
        return response()->json([
            "status" => true,
            "user" => json_decode($user)
        ], 200);
    }
    
    return response()->json([
        "status" => false
    ]);
});

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
