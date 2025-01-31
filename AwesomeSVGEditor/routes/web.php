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

//Home
Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');

//Authentification
Auth::routes();

//Canvas edit section
Route::resource('canvas', 'CanvasController');

Route::post('/reload', 'CanvasController@reload')->name('reload'); //Route supplémentaire pour ne rien perdre après une authentification
Route::post('/svgd', 'CanvasController@downloadSVG_Data'); //Download svg disconnected
Route::post('/png', 'CanvasController@downloadPNG_Data'); //Download png disconnected
Route::post('/canvas/sanitise','CanvasController@sanitiseAjax'); //Sanitise un svg
Route::get('/canvas/{id}/png', 'CanvasController@downloadPNG_ID');
Route::get('/canvas/{id}/svg', 'CanvasController@downloadSVG_ID');
Route::get('/canvas/{id}/public', 'CanvasController@public');
Route::get('/canvas/{id}/private', 'CanvasController@private');

//Share section
Route::get('/shared/{link}', 'CanvasController@shared');
Route::get('/shared/{link}/png', 'CanvasController@downloadPNG_Link');
Route::get('/shared/{link}/svg', 'CanvasController@downloadSVG_Link');
Route::match(['get', 'post'], '/canvas/{id}/share', 'CanvasController@share');
Route::match(['get', 'post'], '/canvas/{id}/unshare', 'CanvasController@unshare');
