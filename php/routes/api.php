<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
// use App\Http\Controllers\MailChimpController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [MainController::class, 'login']);

Route::post('/signup', [MainController::class, 'newUser']);

Route::get('/profile/{id}', [MainController::class, 'getProfile']);

// update username
Route::post('/updateusername/{id}', [MainController::class, 'updateUsername']);

// update email
Route::post('/updateemail/{id}', [MainController::class, 'updateEmail']);

// update password
Route::post('/updatepassword/{id}', [MainController::class, 'updatePassword']);

Route::post('/delete/{id}', [MainController::class, 'deleteUser']);

Route::get('/recipes/recipe/{id}', [MainController::class, 'retrieveARecipe']);

Route::get('/myrecipe/{id}', [MainController::class, 'getARecipe']);

Route::get('/popular', [MainController::class, 'getFourRecipes']);

Route::get('/recipes', [MainController::class, 'getAllRecipes']);

Route::get('/filter/titles', [MainController::class, 'filterRecipesByTitle']);
Route::get('/filter/times', [MainController::class, 'filterRecipesByTime']);
Route::get('/filter/difflevel', [MainController::class, 'filterRecipesByDiffLevel']);
// Route::get('/recipes/filtertime/{id}', [MainController::class, 'filterRecipeByTime']);


Route::get('/myrecipe/filtertitle/{id}', [MainController::class, 'filterRecipeByTitle']);

Route::get('/myrecipe/filterdate/{id}', [MainController::class, 'filterRecipeByDate']);

// search for recipes
Route::get('/recipes/search/{searchStr}', [MainController::class, 'searchRecipe']);

// new recipe with img
Route::post('/newrecipe', [MainController::class, 'newRecipe']);

// update recipe with img
Route::post('/updaterecipe/{id}', [MainController::class, 'updateRecipe']);

Route::post('/deleterecipe/{id}', [MainController::class, 'deleteRecipe']);

// Route::get('/sendnewsletter', [MailChimpController::class, 'index'])->name('send.mail.using.mailchimp.index');