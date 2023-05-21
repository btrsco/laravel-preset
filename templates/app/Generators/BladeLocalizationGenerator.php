<?php

namespace App\Generators;

use App\Services\Localization;

class BladeLocalizationGenerator implements Generator
{
    public function generate($nonce = null): string
    {
        $localization = new Localization;

        $function = file_get_contents(resource_path('scripts/helpers/localization.min.js'));

        return <<<HTML
<script type="text/javascript"{$nonce}>
    const Localization = {$localization->toJson()};
    {$function}
</script>
HTML;
    }
}
