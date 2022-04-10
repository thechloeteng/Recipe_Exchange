<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // each table has a model that interacts with it (CRUD)
    protected $table = "users";

    // allows mass assignment of attributes in db table
    protected $guarded = ['userType'];

    // override default laravel's created_at and updated_at columns
    public $timestamps = false;

    // linking to another model profileImg with a function
    // public function profileImgs(){
    //     return $this->hasMany('App\Models\profileImg');
    // }
}
