<?php

namespace App\Http\Controllers;

use App\Audition;
use App\Channel;
use App\Services\AuditionService;
use Illuminate\Http\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AuditionController extends Controller
{
    /**
     * @var AuditionService
     */
    private $service;

    /**
     * @var AuditionService $service
     */
    public function __construct(AuditionService $service)
    {
        $this->service = $service;
    }

    /**
     * @param channel $channel
     * @param string|null $date
     * @return JsonResponse
     */
    public function getJsonList(Channel $channel, string $date = null): JsonResponse
    {
        if (is_null($date)) {
            $time  = time();
        } else {
            $time = $date;
        }

        $date = date('Y-m-d H:i:s', $time);

        $auditions = $this->service->getAuditionsForChannel($channel, $date);

        return response()->json($auditions);
    }

    /**
     * @param Audition $audition
     * @return JsonResponse
     */
    public function getJsonAudition(Audition $audition): JsonResponse
    {
        return response()->json($audition->load('channel')->toArray());
    }

    /**
     * @param Audition $audition
     * @return BinaryFileResponse
     */
    public function exportCsv(Audition $audition): BinaryFileResponse
    {
        $content = $this->service->auditionToCsv($audition);
        $fileName = storage_path("export.csv");

        FacadesFile::put($fileName, $content);
        
        return response()->download($fileName);
    }
}
