import {deletePaths, editFiles, executeCommand, group, renamePaths} from "@preset/core";

export default definePreset({
    name: 'laravel-preset',
    options: {
        migrate: false,
        seed: false,
        docker: true,
        nova: true,
    },
    postInstall: ({hl}) => [
        `Run the development server with ${hl('npm run dev')}`,
        `Edit your scripts in ${hl('resources/scripts')}`,
        `Edit your pages and components in ${hl('resources/views')}`,
        `Build for production with ${hl('npm run build')}`,
    ],
    handler: async (context) => {
        await group({
            title: 'install composer dependencies',
            handler: async () => {
                if (context.options.nova) {
                    await editFiles({
                        title: 'modify composer.json',
                        files: 'composer.json',
                        operations: [
                            {
                                type: 'edit-json',
                                replace: (json, omit) => ({
                                    ...json,
                                    require: {
                                        ...json.require,
                                        'laravel/nova': '~4.0',
                                    },
                                    repositories: {
                                        ...json.repositories,
                                        'laravel/nova': {
                                            type: "composer",
                                            url: "https://nova.laravel.com"
                                        }
                                    },
                                    files: [
                                        'app/Helpers/Global.php',
                                    ],
                                }),
                            }
                        ]
                    });
                } else {
                    await editFiles({
                        title: 'modify composer.json',
                        files: 'composer.json',
                        operations: [
                            {
                                type: 'edit-json',
                                replace: (json, omit) => ({
                                    ...json,
                                    files: [
                                        'app/Helpers/Global.php',
                                    ],
                                }),
                            }
                        ]
                    });
                }

                let composerPackages = [
                    'laravel/breeze',
                    'spatie/laravel-collection-macros',
                    'lorisleiva/laravel-actions',
                ];

                if (context.options.nova) {
                    composerPackages.push('eminiarts/nova-tabs');
                    composerPackages.push('outofoffice/password-generator');
                }

                await installPackages({
                    title: 'install composer dependencies',
                    for: 'php',
                    packages: composerPackages,
                    dev: false,
                    additionalArgs: [
                        '--no-cache',
                    ],
                });

                await installPackages({
                    title: 'install composer dev dependencies',
                    for: 'php',
                    packages: [
                        'barryvdh/laravel-debugbar',
                        'barryvdh/laravel-ide-helper',
                    ],
                    dev: true,
                    additionalArgs: [
                        '--no-cache',
                    ],
                });
            }
        });

        await group({
            title: 'install npm dependencies',
            handler: async () => {
                await installPackages({
                    title: 'install node dependencies',
                    for: 'node',
                    packages: [
                        'alea-generator',
                        'dayjs',
                        'lodash',
                        'mersenne-twister',
                        'portal-vue',
                        'sass',
                        'vue',
                        'ziggy-js',
                    ],
                    dev: false,
                });

                await installPackages({
                    title: 'install node dev dependencies',
                    for: 'node',
                    packages: [
                        '@tailwindcss/line-clamp',
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
            title: 'modify base laravel install',
            handler: async () => {
                await editFiles({
                    title: 'modify .gitignore',
                    files: '.gitignore',
                    operations: [
                        {
                            type: 'add-line',
                            lines: '_ide_helper_models.php',
                            position: 11,
                        },
                        {
                            type: 'add-line',
                            lines: '_ide_helper.php',
                            position: 11,
                        },
                        {
                            type: 'add-line',
                            lines: '.phpstorm.meta.php',
                            position: 11,
                        },
                        {
                            type: 'add-line',
                            lines: '.DS_Store',
                            position: 7,
                        },
                        {
                            type: 'add-line',
                            lines: '/storage/debugbar',
                            position: 6,
                        },
                    ],
                });

                await editFiles({
                    title: 'modify .env',
                    files: ['.env', '.env.example'],
                    operations: [
                        {
                            type: 'update-content',
                            update: (content) => {
                                return content + '\n\nVITE_APP_NAME="\${APP_NAME}"';
                            }
                        },
                    ],
                });

                await deletePaths({
                    title: 'remove default readme.md',
                    paths: ['readme.md'],
                })
            },
        });

        await group({
            title: 'initialize laravel breeze',
            handler: async () => {
                await executeCommand({
                    title: 'initialize laravel breeze',
                    command: 'php',
                    arguments: [
                        'artisan',
                        'breeze:install',
                        'vue',
                        '--pest',
                        '--ssr',
                    ],
                });
            },
        });

        if (context.options.nova) {
            await group({
                title: 'initialize laravel nova',
                handler: async () => {
                    await executeCommand({
                        title: 'initialize laravel nova',
                        command: 'php',
                        arguments: [
                            'artisan',
                            'nova:install',
                        ],
                    });
                },
            });
        }

        await group({
            title: 'modify laravel breeze',
            handler: async () => {
                await editFiles({
                    title: 'modify jsconfig.json',
                    files: 'jsconfig.json',
                    operations: [
                        {
                            type: 'edit-json',
                            replace: (json, omit) => ({
                                ...json,
                                include: 'resources/**/*',
                            }),
                        }
                    ],
                });

                await deletePaths({
                    title: 'remove default scaffolding',
                    paths: [
                        'app/Http/Controllers/Auth/AuthenticatedSessionController.php',
                        'app/Http/Controllers/Auth/NewPasswordController.php',
                        'app/Http/Middleware/HandleInertiaRequests.php',
                        'resources/css',
                        'resources/js/app.js',
                        'resources/js/bootstrap.js',
                        'resources/js/ssr.js',
                        'resources/views',
                        'vite.config.js',
                    ],
                });

                await renamePaths({
                    title: 'rename resources/js to resources/views',
                    paths: 'resources/js',
                    transformer: (path) => path.base.replace('js', 'views'),
                });

                await renamePaths({
                    title: 'rename directories to lower case',
                    paths: [
                        'resources/views/Components',
                        'resources/views/Layouts',
                        'resources/views/Pages',
                    ],
                    transformer: (path) => path.base.toLowerCase(),
                });

                await editFiles({
                    title: 'fix component imports',
                    files: [
                        'resources/views/layouts/AuthenticatedLayout.vue',
                        'resources/views/layouts/GuestLayout.vue',
                        'resources/views/pages/Auth/ConfirmPassword.vue',
                        'resources/views/pages/Auth/ForgotPassword.vue',
                        'resources/views/pages/Auth/Login.vue',
                        'resources/views/pages/Auth/Register.vue',
                        'resources/views/pages/Auth/ResetPassword.vue',
                        'resources/views/pages/Auth/VerifyEmail.vue',
                        'resources/views/pages/Dashboard.vue',
                        'resources/views/pages/Welcome.vue',
                        'resources/views/pages/Profile/Edit.vue',
                        'resources/views/pages/Profile/Partials/DeleteUserForm.vue',
                        'resources/views/pages/Profile/Partials/UpdatePasswordForm.vue',
                        'resources/views/pages/Profile/Partials/UpdateProfileInformationForm.vue',
                    ],
                    operations: [
                        {
                            type: 'update-content',
                            update: (content) => {
                                content = content.replace(/@\/Components/g, '@/views/components');
                                content = content.replace(/@\/Layouts/g, '@/views/layouts');
                                content = content.replace(/@\/Pages/g, '@/views/pages');
                                return content;
                            }
                        }
                    ],
                });

                await editFiles({
                    title: 'fix resource paths in tailwind.config.js',
                    files: 'tailwind.config.js',
                    operations: [
                        {
                            type: 'update-content',
                            update: (content) => {
                                content = content.replace(/\.\/resources\/js\/\*\*\/\*\.vue/g, './resources/views/**/*.{php,vue,js}');
                                content = content.replace(/ {8}'\.\/resources\/views\/\*\*\/\*\.blade\.php',\n/g, '');
                                return content;
                            }
                        }
                    ]
                });
            },
        });

        if (context.options.nova) {
            await group({
                title: 'modify laravel nova',
                handler: async () => {
                    await deletePaths({
                        title: 'remove default scaffolding',
                        paths: [
                            'app/Nova/User.php',
                        ],
                    });
                },
            });
        }

        await group({
            title: 'extract preset files',
            handler: async () => {
                await deletePaths({
                    title: 'remove files to replace with preset files',
                    paths: [
                        'app/Http/Kernel.php',
                        'app/Models/User.php',
                        'app/Providers/EventServiceProvider.php',
                        'database/factories/UserFactory.php',
                        'database/migrations/2014_10_12_000000_create_users_table.php',
                        'database/seeders/DatabaseSeeder.php',
                        'public/robots.txt',
                        'routes/web.php',
                        'routes/auth.php',
                    ],
                });

                await extractTemplates({
                    title: 'extract preset files',
                    from: './',
                    to: './',
                });

                await editFiles({
                    title: 'modify config/app.php',
                    files: 'config/app.php',
                    operations: [
                        {
                            type: 'add-line',
                            lines: 'App\\Providers\\BladeDirectiveServiceProvider::class,',
                            position: 170,
                        }
                    ],
                });

                await editFiles({
                    title: 'modify package.json',
                    files: 'package.json',
                    operations: [
                        {
                            type: 'edit-json',
                            replace: (json, omit) => ({
                                ...json,
                                scripts: {
                                    ...json.scripts,
                                    'dev': 'vite --host',
                                },
                            }),
                        }
                    ],
                });

                if (!context.options.nova) {
                    await deletePaths({
                        title: 'remove nova related files',
                        paths: ['app/Nova'],
                    });
                }
            }
        });

        if (context.options.docker) {
            await group({
                title: 'install laravel sail',
                handler: async () => {
                    await deletePaths({
                        title: 'remove dependencies',
                        paths: [
                            'vendor',
                            'node_modules',
                            'composer.lock',
                            'package-lock.json',
                        ],
                    });

                    await executeCommand({
                        title: 'publish sail scaffolding',
                        command: 'php',
                        arguments: [
                            'artisan',
                            'sail:install',
                            '--quiet',
                        ],
                    });
                },
            });
        }

        await group({
            title: 'build assets & helpers',
            handler: async () => {
                if (context.options.docker) {
                    await executeCommand({
                        title: 'install composer dependencies within docker',
                        command: './vendor/bin/sail',
                        arguments: [
                            'composer',
                            'install',
                        ],
                    });

                    await executeCommand({
                        title: 'install npm dependencies within docker',
                        command: './vendor/bin/sail',
                        arguments: [
                            'npm',
                            'install',
                        ],
                    });

                    await executeCommand({
                        title: 'build assets within docker',
                        command: './vendor/bin/sail',
                        arguments: [
                            'npm',
                            'run',
                            'build',
                        ],
                    });
                } else {
                    await executeCommand({
                        title: 'build assets',
                        command: 'npm',
                        arguments: [
                            'run',
                            'build',
                        ],
                    });
                }

                await executeCommand({
                    title: 'generate phpstorm meta helper files',
                    command: 'php',
                    arguments: [
                        'artisan',
                        'ide-helper:meta',
                    ],
                });

                await executeCommand({
                    title: 'generate phpstorm ide helper files',
                    command: 'php',
                    arguments: [
                        'artisan',
                        'ide-helper:generate',
                        '--write_mixins',
                    ],
                });

                if (context.options.migrate) {
                    let options = ['--force'];

                    if (context.options.seed) options.push('--seed');

                    await executeCommand({
                        title: 'run migrations',
                        command: 'php',
                        arguments: [
                            'artisan',
                            'migrate',
                            ...options
                        ],
                    });

                    await executeCommand({
                        title: 'generate phpstorm ide models helper files',
                        command: 'php',
                        arguments: [
                            'artisan',
                            'ide-helper:models',
                            '--nowrite',
                        ],
                    });
                }
            }
        });
    },
});