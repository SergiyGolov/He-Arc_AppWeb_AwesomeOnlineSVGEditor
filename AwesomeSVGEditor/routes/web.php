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

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/profile', 'HomeController@show')->middleware('auth.basic'); // Nécessite une authentification

/*
Route::get('/svg', 'SVGController@index');
Route::get('/svg/{id}', 'SVGController@show');
Route::put('/new', 'SVGController@new');
Route::post('/save', 'SVGController@save');
Route::delete('/delete/{id}', 'SVGController@delete');
*/

Route::resource('canvas', 'CanvasController');//->middleware('auth.basic');

Route::get('/canvas/{id}/png', 'CanvasController@downloadPNG');
Route::get('/canvas/{id}/svg', 'CanvasController@downloadSVG');

Route::post('/sanitiseAjax','CanvasController@sanitiseAjax');
