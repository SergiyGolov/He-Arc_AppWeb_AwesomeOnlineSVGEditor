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

Route::get('/', 'HomeController@index');

Auth::routes();
//Route supplémentaire pour ne rien perdre après une authentification
Route::put('/canvas/create', 'CanvasController@createPut');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/profile', 'HomeController@show')->middleware('auth.basic'); // Nécessite une authentification


Route::resource('canvas', 'CanvasController');//->middleware('auth.basic');

Route::get('/canvas/{id}/png', 'CanvasController@downloadPNG');
Route::get('/canvas/{id}/svg', 'CanvasController@downloadSVG');
Route::get('/shared/{link}', 'CanvasController@shared');
Route::get('/canvas/{id}/share', 'CanvasController@share');
Route::get('/canvas/{id}/unshare', 'CanvasController@unshare');

Route::post('/sanitiseAjax','CanvasController@sanitiseAjax');
