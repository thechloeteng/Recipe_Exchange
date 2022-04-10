<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeImg extends Model
{
    use HasFactory;

    protected $table = "recipeimgs";

    public $timestamps = false;
}
