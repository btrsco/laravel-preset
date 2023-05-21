# Project Name

> Add a short description of the project. This should be no more than a few
> sentences. It should be clear what the project is and what it does. It should
> also include any relevant links to the project.

Access the live site at [example.com](https://example.com) or access the staging
site at [staging.example.com](https://staging.example.com).

## Table of Contents

<!-- TOC -->
* [Project Name](#project-name)
  * [Table of Contents](#table-of-contents)
* [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Database Seeding](#database-seeding)
* [Code Overview](#code-overview)
  * [Dependencies](#dependencies)
  * [Structure](#structure)
  * [Environment Variables](#environment-variables)
  * [Testing](#testing)
<!-- TOC -->

# Getting Started

Below you will find everything you need to get this project installed and
running, as well as any nuances that you may need to be aware of for running
this project.

---

## Installation

Please check the
official [Laravel 10 documentation](https://laravel.com/docs/10.x/)
for an installation guide with the server requirements before you get started.

Clone the repository:

```shell
git clone git@github.com:btrsco/anymoji.git
```

Switch to the repo folder:

```shell
cd project
```

Install all the composer and npm dependencies:

```shell
composer install
npm install
```

Copy the `.env.example` and generate a new application key:

```shell
cp .env.example .env
php artisan key:generate
```

Run the database migrations **(Set the database connection in .env before
migrating)**:

```shell
php artisan migrate
```

Build the frontend assets, this will also build the SSR assets:

```shell
npm run build
```

You can now run the SSR server:

```shell
php artisan inertia:start-ssr
```

## Database Seeding

Populate the database with seed data with relationships. This can help you to
quickly start testing the application and/or api with realistic data.

Run the database seeder:

```shell
php artisan db:seed
```

This will run the base `/database/seeders/DatabaseSeeder.php` which has a list
of universal, development and production seeders. Comment out the seeders you
don’t need to run.

**Note**: It's recommended to have a clean database before seeding. You can
refresh your migrations at any point to clean the database by running the
following command:

```shell
php artisan migrate:fresh --seed
```

# Code Overview

The following is an overview of the code structure. The structure follows the
Laravel best practices and has been optimized to be as simple as possible. If
you are not familiar with some terms used below, you can read more about them
in the [Laravel 10 documentation](https://laravel.com/docs/10.x/) or the
specific documentation for the dependencies listed below.

---

## Dependencies

All of our current dependencies are listed below. You can find out more about
each of these dependencies by clicking on the links below.

- [`laravel/nova`](https://nova.laravel.com/docs/4.0/installation.html): Admin
  panel for Laravel
- [`laravel/breeze`](https://laravel.com/docs/10.x/starter-kits#laravel-breeze):
  Simple authentication scaffolding
- [`tightenco/ziggy`](https://github.com/tighten/ziggy): Usable routes in
  Javascript
- [`lorisleiva/laravel-actions`](https://laravelactions.com/): Classes that
  handle a specific task
- [`barryvdh/laravel-debugbar`](https://github.com/barryvdh/laravel-debugbar):
  Handy debug console for Laravel
- [`barryvdh/laravel-ide-helper`](https://github.com/barryvdh/laravel-ide-helper):
  IDE helper file generator
- [`laravel/pint`](https://laravel.com/docs/10.x/pint): PHP code style fixer
- [`laravel/sail`](https://laravel.com/docs/10.x/sail): Docker containerization
  support
- [`pestphp/pest`](https://pestphp.com/docs/installation): Minimal PHP testing
  suite

## Structure

Below is a list of the most important folders in the project and what they are
used for.

- `app/Actions`: Contains all single task action classes
- `app/Events`: Contains all events
- `app/Generators`: Contains all generators
- `app/Helpers`: Contains all helper classes and global helpers functions
- `app/Http/Controllers`: Contains all web controllers
- `app/Http/Controllers/Api`: Contains all api controllers
- `app/Http/Middleware`: Contains all application middleware
- `app/Http/Requests`: Contains all web form requests
- `app/Http/Requests/Api`: Contains all api form requests
- `app/Listeners`: Contains all event listeners
- `app/Models`: Contains all Eloquent models
- `app/Models/Enums`: Contains all model enums
- `app/Nova`: Contains all Laravel Nova resources, dashboards, etc.
- `app/Rules`: Contains all custom validation rules
- `app/Services`: Contains all service classes
- `config`: Contains all the apps config files
- `database/factories`: Contains all model factories
- `database/migrations`: Contains all database migrations
- `database/seeders`: Contains all database seeders
- `database/seeders/Development`: Contains all development seeders
- `database/seeders/Production`: Contains all production seeders
- `database/seeders/Universal`: Contains all universal seeders
- `routes`: Contains all app routes
- `routes/web`: Contains all web middleware app routes
- `routes/api`: Contains all api middleware app routes
- `tests`: Contains all app tests

## Environment Variables

- `.env`: Environment variables can be set in this file
- `.env.example`: Example file with every possible variable

**Note**: You can quickly set the database information and other variables in
this file and have the application fully working.

## Testing

We use Pest for testing. You can run the tests with the following command:

```shell
./vendor/bin/pest
```
