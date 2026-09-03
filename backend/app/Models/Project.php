<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';
    protected $fillable = [
        'owner_id','slug','name','description','runtime','region','plan_id','status','start_command','entry_file'
    ];
    public $timestamps = true;

    public function owner() {
        return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }
}
