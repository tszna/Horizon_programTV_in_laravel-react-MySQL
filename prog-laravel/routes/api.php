<?php

use App\Http\Controllers\AuditionController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Pobranie kanałó z audycjami dla zadanej daty i w zadanej ilości - offset
Route::get('/channel/{offset}/{amountOfChannels}/{date?}', [ChannelController::class, 'getJsonList'])
    ->where('offset', '\d+')
    ->where('amountOfChannels', '\d+')
    ->where('date', '\d{5,}');

Route::get('/channel/load/{channel}/{date?}', [ChannelController::class, 'getJsonChannel'])
    ->where('channel', '\d+')
    ->where('date', '\d{5,}');

// Pobranie audycji dla kanału w zadanym czasie
Route::get('/audition/{channel}/{date?}', [AuditionController::class, 'getJsonList'])
    ->where('channel', '\d+')
    ->where('date', '\d{5,}');

Route::get('/audition/load/{audition}/', [AuditionController::class, 'getJsonAudition'])
    ->where('audition', '\d+');

// Wyszukiwanie odpowiadających danych w API wg frazy
Route::get('/search/{phrase?}', [SearchController::class, 'searchPhrase'])
    ->where('phrase', '.*');

// Eksport audycji jako plik CSV
Route::get('/audition/export/{audition}', [AuditionController::class, 'exportCsv'])
    ->where('audition', '\d+');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
