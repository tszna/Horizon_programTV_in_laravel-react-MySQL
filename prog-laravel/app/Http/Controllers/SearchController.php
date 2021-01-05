<?php

namespace App\Http\Controllers;

use App\Services\SearchService;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    /**
     * @var SearchService
     */
    protected $service;

    /**
     * @param SearchService $service
     */
    public function __construct(SearchService $service)
    {
        $this->service = $service;
    }

    /**
     * @param string $phrase
     * @return JsonResponse
     */
    public function searchPhrase(string $phrase = null): JsonResponse
    {
        if (is_null($phrase) || strlen($phrase) === 0) {
            return response()->json([], JsonResponse::HTTP_BAD_REQUEST);
        }

        $results = $this->service->searchForPhrase($phrase);

        return response()->json($results);
    }
}
