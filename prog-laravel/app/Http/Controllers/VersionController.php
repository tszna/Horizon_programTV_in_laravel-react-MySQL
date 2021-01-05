<?php

namespace App\Http\Controllers;

class VersionController extends Controller
{
	public function version()
	{
		return "Laravel version: " . app()->version();
	}
}