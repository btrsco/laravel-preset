const defaultTheme = require( 'tailwindcss/defaultTheme' );

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './storage/framework/views/**/*.{blade.php,php}',
        './resources/**/*.{blade.php,php}',
        './resources/**/*.{vue,js,ts}',
        './resources/**/*.{css,scss,sass}',
    ],
    theme:   {
        screens: {
            'xs':  '384px',
            'sm':  '512px',
            'md':  '768px',
            'lg':  '1024px',
            'xl':  '1280px',
            '2xl': '1536px',
        },
        extend:  {
            boxShadow:  {
                'inset':   'inset 0px 0px 1px rgba(0, 0, 0, 0.1)',
                'xs':      '0px 2px 2px rgba(0, 0, 0, 0.02), 0px 4px 8px rgba(0, 0, 0, 0.04)',
                'sm':      '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 8px rgba(0, 0, 0, 0.05)',
                'DEFAULT': '0px 4px 4px rgba(0, 0, 0, 0.05), 0px 8px 8px rgba(0, 0, 0, 0.05)',
                'md':      '0px 4px 8px rgba(0, 0, 0, 0.05), 0px 8px 16px rgba(0, 0, 0, 0.05)',
                'lg':      '0px 12px 12px rgba(0, 0, 0, 0.07), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 4px 4px rgba(0, 0, 0, 0.02), 0px 2px 2px rgba(0, 0, 0, 0.01)',
                'xl':      '0px 0px 0px rgba(0, 0, 0, 0), 0px 20px 20px rgba(0, 0, 0, 0.1), 0px 12px 12px rgba(0, 0, 0, 0.07), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 4px 4px rgba(0, 0, 0, 0.02), 0px 2px 2px rgba(0, 0, 0, 0.01)',
                '2xl':     '0px 24px 24px rgba(0, 0, 0, 0.1), 0px 20px 20px rgba(0, 0, 0, 0.1), 0px 12px 12px rgba(0, 0, 0, 0.07), 0px 6px 6px rgba(0, 0, 0, 0.04), 0px 4px 4px rgba(0, 0, 0, 0.02), 0px 2px 2px rgba(0, 0, 0, 0.01)',
            },
            colors:     {
                white: '#fff',
                black: '#000',
                gray:  {
                    25:  '#fdfdfd',
                    50:  '#f7f7f7',
                    100: '#f2f2f2',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0d0d0d',
                },
            },
            fontFamily: {
                'sans': [ 'Inter', ...defaultTheme.fontFamily.sans ]
            },
        },
    },
    plugins: [],
};