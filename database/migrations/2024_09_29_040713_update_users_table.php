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
        Schema::table('users', function (Blueprint $table) {
            $table->string('music_taste')->nullable()->change();
            $table->string('movie_taste')->nullable()->change();
            $table->string('grade')->nullable()->change();
            $table->integer('rating')->nullable()->default(0)->change();

            // Add the avatar field
            $table->string('avatar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert changes made in the up method
            $table->string('music_taste')->nullable(false)->change();
            $table->string('movie_taste')->nullable(false)->change();
            $table->string('grade')->nullable(false)->change();
            $table->integer('rating')->nullable(false)->default(null)->change();

            // Drop the avatar field
            $table->dropColumn('avatar');
        });
    }
};
