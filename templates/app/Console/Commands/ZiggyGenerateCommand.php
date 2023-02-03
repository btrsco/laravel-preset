<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Tightenco\Ziggy\CommandRouteGenerator;

class ZiggyGenerateCommand extends CommandRouteGenerator
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ziggy:generate
                            {path=./resources/scripts/helpers/ziggy.js : Path to the generated JavaScript file.}
                            {--url=}
                            {--group=}';
}
