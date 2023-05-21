<?php

namespace App\Nova;

use App\Rules\AlphaDashDot;
use App\Rules\ReservedUsername;
use Eminiarts\Tabs\Tabs;
use Illuminate\Validation\Rules;
use Laravel\Nova\Fields\Badge;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Line;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Stack;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Panel;
use OutOfOffice\PasswordGenerator\PasswordGenerator;

class User extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\User>
     */
    public static string $model = \App\Models\User::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search
        = [
            'id',
            'name',
            'username',
            'email',
        ];

    /**
     * The possible roles for this model.
     *
     * @var array|string[]
     */
    const ROLES
        = [
            'user'      => 'User',
            'moderator' => 'Moderator',
            'admin'     => 'Administrator',
        ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     *
     * @return array
     */
    public function fields(NovaRequest $request): array
    {
        return [
            ...$this->indexOnlyFields(),

            Text::make('Display Name', 'name')
                ->sortable()
                ->rules('required', 'max:64')
                ->showOnPreview()
                ->hideFromIndex(),

            Text::make('Username')
                ->sortable()
                ->rules(new AlphaDashDot, 'min:3', 'max:32', 'unique:users,username,{{resourceId}}', 'required',
                    new ReservedUsername)
                ->showOnPreview()
                ->hideFromIndex(),

            Text::make('Email Address', 'email')
                ->sortable()
                ->rules('required', 'email', 'max:254')
                ->creationRules('unique:users,email')
                ->updateRules('unique:users,email,{{resourceId}}')
                ->showOnPreview()
                ->hideFromIndex(),

            Badge::make('Email Verified',
                function () {
                    return $this->hasVerifiedEmail() ? 'Verified' : 'Unverified';
                })
                ->types([
                    'Verified'   => 'badge-verified',
                    'Unverified' => 'badge-unverified',
                ])
                ->showOnPreview()
                ->onlyOnDetail(),

            PasswordGenerator::make('Password')
                ->creationRules('required', Rules\Password::defaults())
                ->updateRules('nullable', Rules\Password::defaults())
                ->onlyOnForms(),

            Tabs::make('Relations', $this->relationshipTabGroupFields()),

            new Panel('Advanced', $this->advancedFields()),
        ];
    }

    public function indexOnlyFields(): array
    {
        return [

            Stack::make('Identity', 'name',
                [
                    Line::make('Display Name', 'name')
                        ->extraClasses('text-base font-semibold'),
                    Line::make('Username')
                        ->displayUsing(fn() => '@' . $this->username)
                        ->extraClasses('text-sm font-medium text-gray-400 dark:text-gray-500'),
                ])
                ->sortable()
                ->onlyOnIndex(),

            Stack::make('Email',
                [
                    Line::make('Email')
                        ->sortable()
                        ->onlyOnIndex(),

                    Badge::make('Verified',
                        function () {
                            return $this->hasVerifiedEmail() ? 'Verified' : 'Unverified';
                        })
                        ->types([
                            'Verified'   => 'badge-verified',
                            'Unverified' => 'badge-unverified',
                        ]),
                ])
                ->onlyOnIndex(),

            Badge::make('Role')
                ->types([
                    'admin' => 'badge-error',
                    'user'  => 'badge-success',
                ])
                ->onlyOnIndex(),
        ];
    }

    public function relationshipTabGroupFields(): array
    {
        return [
            HasMany::make('Characters'),
            HasMany::make('Conversations'),
        ];
    }

    public function advancedFields(): array
    {
        return [
            ID::make()
                ->readonly()
                ->hideFromIndex(),

            Text::make('ID')
                ->onlyOnForms()
                ->required()
                ->readonly(),

            Select::make('Role')
                ->default(function () {
                    return 'user';
                })
                ->options(User::ROLES)
                ->displayUsingLabels()
                ->searchable()
                ->sortable()
                ->rules('required')
                ->showOnPreview()
                ->hideFromIndex(),

            DateTime::make('Last Logged In', 'last_logged_in_at')
                ->required()
                ->readonly()
                ->showOnPreview()
                ->onlyOnForms(),

            Text::make('Last Logged In', 'last_logged_in_at')
                ->displayUsing(function () {
                    return $this->last_logged_in_at?->toDayDateTimeString();
                })
                ->onlyOnDetail(),

            DateTime::make('Last Active', 'last_active_at')
                ->onlyOnForms()
                ->required()
                ->readonly(),

            Text::make('Last Active', 'last_active_at')
                ->displayUsing(function () {
                    return $this->last_active_at?->toDayDateTimeString();
                })
                ->showOnPreview()
                ->onlyOnDetail(),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     *
     * @return array
     */
    public function cards(NovaRequest $request): array
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     *
     * @return array
     */
    public function filters(NovaRequest $request): array
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     *
     * @return array
     */
    public function lenses(NovaRequest $request): array
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     *
     * @return array
     */
    public function actions(NovaRequest $request): array
    {
        return [];
    }
}
