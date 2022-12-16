import {group} from "@preset/core";

export default definePreset({
    name: 'laravel-preset',
    options: {
        // ...
    },
    handler: async () => {
        await group({
            title: 'install dependencies',
            handler: async () => {
                // Install composer dependencies
                await installPackages({
                    title: 'install composer dependencies',
                    for: 'php',
                    packages: [
                        'inertiajs/inertia-laravel',
                        'innocenzi/laravel-vite',
                        'spatie/laravel-collection-macros',
                        'spatie/laravel-ray',
                        'tightenco/ziggy',
                    ],
                    dev: false,
                });

                // Install composer dev dependencies
                await installPackages({
                    title: 'install composer dev dependencies',
                    for: 'php',
                    packages: [
                        'barryvdh/laravel-debugbar',
                        'barryvdh/laravel-ide-helper',
                        'laravel/breeze',
                        'pestphp/pest',
                        'pestphp/pest-plugin-laravel',
                    ],
                    dev: true,
                });

                // Install node dependencies
                await installPackages({
                    title: 'install node dependencies',
                    for: 'node',
                    packages: [
                        '@headlessui/vue',
                        '@inertiajs/inertia',
                        '@inertiajs/inertia-vue3',
                        '@inertiajs/progress',
                        'dayjs',
                        'lodash',
                        'sass',
                        'vue',
                        'ziggy-js',
                    ],
                    dev: false,
                });

                // Install node dev dependencies
                await installPackages({
                    title: 'install node dev dependencies',
                    for: 'node',
                    packages: [
                        '@tailwindcss/line-clamp',
                        '@vitejs/plugin-vue',
                        '@vue/compiler-sfc',
                        'alpinejs',
                        'autoprefixer',
                        'laravel-vite-plugin',
                        'postcss',
                        'tailwindcss',
                        'vite',
                        'vite-plugin-laravel',
                    ],
                    dev: true,
                });
            }
        });

        await group({
            title: 'initalize laravel breeze',
            handler: async () => {
                // Initialize Laravel Breeze
                await executeCommand({
                    command: 'php',
                    arguments: [
                        'artisan',
                        'breeze:install',
                    ],
                });

                // Remove the default Laravel auth scaffolding
                await deletePaths({
                    title: 'remove default auth scaffolding',
                    paths: [
                        'app/Http/View',
                        'app/resources/css',
                        'app/resources/js',
                        'app/resources/views',
                        'app/tests/Feature/ProfileTest.php',
                    ],
                });
            },
        });

        await group({
            title: 'laravel inertia scaffolding',
            handler: async () => {
                // Apply the Laravel Inertia scaffolding
                await applyNestedPreset({
                    title: 'install laravel:inertia',
                    preset: 'laravel:inertia'
                });

                // Remove the default Laravel Inertia scaffolding
                await deletePaths({
                    title: 'remove default laravel:inertia scaffolding',
                    paths: [
                        'vite.config.ts',
                        'tsconfig.json',
                        'resources/views',
                        'resources/scripts',
                        'resources/css',
                    ],
                });
            }
        });

        await group({
            title: 'extract preset files',
            handler: async () => {
                // Extract preset files to root
                await extractTemplates({
                    from: './',
                    to: './',
                });
            }
        });

        await group({
            title: 'build assets & helpers',
            handler: async () => {
                // Generate ziggy routes
                await executeCommand({
                    command: 'php',
                    arguments: [
                        'artisan',
                        'ziggy:generate',
                    ],
                });

                // Build assets
                await executeCommand({
                    command: 'npm',
                    arguments: [
                        'run',
                        'build',
                    ],
                });

                // Generate phpstorm meta helper files
                await executeCommand({
                    command: 'php',
                    arguments: [
                        'artisan',
                        'ide-helper:meta',
                    ],
                });

                // Generate ide helper files
                await executeCommand({
                    command: 'php',
                    arguments: [
                        'artisan',
                        'ide-helper:generate',
                        '--write_mixins',
                    ],
                });

                // Generate ide models helper files
                await executeCommand({
                    command: 'php',
                    arguments: [
                        'artisan',
                        'ide-helper:models',
                        '--write-mixin',
                        '--reset',
                    ],
                });
            }
        });
    },
});