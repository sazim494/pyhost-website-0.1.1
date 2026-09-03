<?php

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;

// Basic auth middleware placeholder (implement JWT/Sanctum in prod)
$router->get('/projects', function (Request $req) {
    // TODO: read user from auth
    $projects = Project::limit(50)->get();
    return response()->json($projects);
});

$router->post('/projects', function (Request $req) {
    $data = $req->only(['name', 'slug', 'runtime', 'region', 'plan_id', 'start_command']);
    $project = Project::create(array_merge($data, ['owner_id' => 1]));
    return response()->json($project, 201);
});

$router->post('/projects/{id}/deploy', function ($id, Request $req) {
    // Enqueue a deploy job (simplified)
    // In real app: validate ownership, create deployments record, dispatch job to queue
    return response()->json(['message' => 'Deploy queued', 'project_id' => (int)$id], 202);
});
