<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ReservedUsername implements ValidationRule
{
    /**
     * List of all reserved usernames.
     *
     * @var array|string[]
     */
    private array $usernames = [
        // A
        'about', 'abuse', 'account', 'accounts', 'add', 'adm', 'ads', 'advertising',
        'affiliate', 'affiliates', 'analytics', 'api', 'app', 'apps', 'appserver',
        'archive', 'assets', 'auth', 'authentication', 'avatar',

        // B
        'beta', 'billing', 'blog', 'blogs', 'business',

        // C
        'categories', 'category', 'comment', 'comments', 'contact', 'controlpanel', 'cp', 'cpanel',
        'creator', 'creators', 'css', 'customer', 'customers',

        // D
        'dashboard', 'designer', 'dev', 'developer', 'discover', 'download', 'downloads',

        // E
        'edit', 'editor',

        // F
        'faq', 'feed', 'file', 'files', 'follow', 'forum', 'forums',

        // G
        'goto', 'group', 'groups', 'guest',

        // H
        'help', 'helpdesk', 'home', 'homepage',

        // I
        'image', 'images', 'info', 'invite',

        // J
        'job', 'jobs',

        // K
        'knowledgebase',

        // L
        'library', 'like', 'likes', 'link', 'links', 'login', 'logout',

        // M
        'manager', 'me', 'media', 'message', 'messages', 'messenger', 'mod', 'moderator',

        // N
        'name', 'news', 'newsletter', 'nickname', 'null', 'nova',

        // O
        'onboarding', 'order', 'orders', 'owner',

        // P
        'page', 'pages', 'posts', 'preferences', 'privacy', 'privacypolicy',
        'privacy_policy', 'privacy-policy', 'profile',

        // Q

        // R
        'register',

        // S
        'search', 'settings', 'signin', 'signout', 'signup', 'sign-in', 'sign-out', 'sign-up',
        'sitemap', 'staff', 'submit', 'submitted',

        // T
        'test', 'terms', 'terms-of-service', 'terms_of_service', 'termsofservice',

        // U
        'upload', 'user', 'username',

        // V

        // W

        // X

        // Y
        'you',

        // Z
    ];

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (in_array( trim( strtolower( $value ) ), $this->usernames )) {
            $fail(__('This :attribute has been reserved.'));
        }
    }
}
