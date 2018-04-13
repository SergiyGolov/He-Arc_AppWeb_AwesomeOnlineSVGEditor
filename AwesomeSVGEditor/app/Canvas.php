<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Canvas extends Model
{
    //

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    protected $table = 'canvas';
}
