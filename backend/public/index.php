<?php
// Minimal Lumen bootstrap for example (production-ready app should use full bootstrap)
require __DIR__.'/../vendor/autoload.php';

use Laravel\Lumen\Application;
use Illuminate\Database\Capsule\Manager as Capsule;

$app = new Application(dirname(__DIR__));

Dotenv\Dotenv::createImmutable(dirname(__DIR__))->load();

// Setup Eloquent Capsule (DB)
$capsule = new Capsule;
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => getenv('DB_HOST') ?: '127.0.0.1',
    'database'  => getenv('DB_DATABASE') ?: 'pyhost',
    'username'  => getenv('DB_USERNAME') ?: 'root',
    'password'  => getenv('DB_PASSWORD') ?: '',
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix'    => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

// Very small router
$app->router->get('/', function () use ($app) {
    return response()->json(['message' => 'PyHost API (dev)']);
});

$app->router->group(['prefix' => 'api/v1'], function ($router) {
    require __DIR__.'/../routes/web.php';
});

$app->run();
