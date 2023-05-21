<?php

namespace App\Services;

class Localization
{
    private string $locale;
    private mixed  $fallbackLocale;
    private array  $messages         = [];
    private array  $fallbackMessages = [];

    public function __construct()
    {
        $this->locale         = app()->getLocale();
        $this->fallbackLocale = config('app.fallback_locale', 'en');

        $localeFile         = base_path('lang/' . $this->locale . '.json');
        $fallbackLocaleFile = base_path('lang/' . $this->fallbackLocale . '.json');

        if (file_exists($localeFile)) {
            $this->messages = json_decode(file_get_contents($localeFile), true);
        }

        if (file_exists($fallbackLocaleFile)) {
            $this->fallbackMessages = json_decode(file_get_contents($fallbackLocaleFile), true);
        }
    }

    /**
     * Convert this Localization instance to an array.
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'locale'          => $this->locale,
            'fallback_locale' => $this->fallbackLocale,
            'messages'        => [
                $this->locale         => $this->messages,
                $this->fallbackLocale => $this->fallbackMessages,
            ],
        ];
    }

    /**
     * Convert this Localization instance to JSON.
     *
     * @param int $options
     *
     * @return string
     */
    public function toJson(int $options = 0): string
    {
        return json_encode($this->toArray(), $options);
    }
}
