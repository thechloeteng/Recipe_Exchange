<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profileImg extends Model
{
    use HasFactory;

    protected $table = "profileimgs";

    protected $guarded = [];

    public $timestamps = false;

    // public function users(){
    //     return $this->belongsTo('App\Models\User');
    // }
}
