<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Register the seeders for each environment.
     *
     * @var array|array[]
     */
    public array $seeders = [
        'universal' => [
            Universal\UserSeeder::class,
        ],
        'production' => [
            Production\UserSeeder::class,
        ],
        'development' => [
            Development\UserSeeder::class,
        ],
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call($this->seeders['universal']);

        app()->environment(['production', 'staging'])
            ? collect($this->seeders['production'])->each(fn ($seeder) => $this->call($seeder))
            : collect($this->seeders['development'])->each(fn ($seeder) => $this->call($seeder));
    }
}
