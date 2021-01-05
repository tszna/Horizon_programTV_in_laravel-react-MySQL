<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auditions', function (Blueprint $table) {
            $table->id();

            $table->string("title");
            $table->text("description");
            $table->dateTime("date");
            $table->unsignedInteger("duration");
            $table->unsignedBigInteger("channel_id");

            $table->timestamps();

            $table->foreign("channel_id")->references("id")->on("channels")->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auditions');
    }
}
