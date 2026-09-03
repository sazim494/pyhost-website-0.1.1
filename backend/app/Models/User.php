<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = ['email','name','password_hash','is_verified'];
    protected $hidden = ['password_hash'];
    public $timestamps = true;
}
