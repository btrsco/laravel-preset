<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('name');
            $table->string('username', 50)->unique();
            $table->string('email')->unique();

            $table->string('password');
            $table->rememberToken();

            $table->enum('role', ['user', 'moderator', 'admin'])->default('user');

            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp( 'last_logged_in_at' )->nullable();
            $table->timestamp( 'last_active_at' )->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
