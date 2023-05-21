<?php

namespace App\Providers;

use App\Generators\BladeLocalizationGenerator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class BladeDirectiveServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Blade::directive('localization', fn($expression) =>
            "<?php echo app('" . BladeLocalizationGenerator::class . "')->generate(); ?>");
    }
}
