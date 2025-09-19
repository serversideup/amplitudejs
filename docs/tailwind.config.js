const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    theme: {
        fontSize: {
            '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
            xs: ['0.8125rem', { lineHeight: '1.5rem' }],
            sm: ['0.875rem', { lineHeight: '1.5rem' }],
            base: ['1rem', { lineHeight: '1.75rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '1' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
        },
        typography: {
            DEFAULT: {
                css: {
                    h1: {
                        'color': '#F7F7F7',
                        'font-size': '2rem',
                        'font-weight': 600,
                        'margin-top': '32px',
                        'margin-bottom': '16px',
                    },
                    'h1 a': {
                        'color': '#F7F7F7',
                        'font-size': '2rem',
                        'text-decoration': 'none',
                        'font-weight': 600,
                    },
                    h2: {
                        'color': '#F7F7F7',
                        'font-size': '1.5rem',
                        'font-weight': 600,
                        'margin-top': '32px',
                        'margin-bottom': '16px',
                    },
                    'h2 a': {
                        'color': '#F7F7F7',
                        'font-size': '1.5rem',
                        'text-decoration': 'none',
                        'font-weight': 600,
                    },
                    h3: {
                        'color': '#F7F7F7',
                        'font-size': '1.25rem',
                        'font-weight': 600,
                        'margin-top': '16px',
                        'margin-bottom': '8px',
                    },
                    'h3 a': {
                        'color': '#F7F7F7',
                        'font-size': '1.25rem',
                        'text-decoration': 'none',
                        'font-weight': 600,
                    },
                    h4: {
                        'color': '#F7F7F7',
                        'font-size': '1rem',
                        'font-weight': 600,
                        'margin-top': '16px',
                        'margin-bottom': '0px',
                    },
                    'h4 a': {
                        'color': '#F7F7F7',
                        'font-size': '1rem',
                        'text-decoration': 'none',
                        'font-weight': 600,
                    },
                    'ol': {
                        'list-style-type': 'decimal',
                        'margin-left': '1rem',
                        'margin-bottom': '16px'
                    },
                    'ol > li::marker': {
                        'color': '#CECFD2',
                    },
                    'ol > li': {
                        'color': '#CECFD2',
                        'margin-bottom': '6px'
                    },
                    'ul': {
                        'list-style-type': 'disc',
                        'margin-left': '1rem',
                        'margin-bottom': '16px'
                    },
                    'ul > li': {
                        'color': '#CECFD2',
                        'margin-bottom': '6px'
                    },
                    'code': {
                        'color': 'rgb(250, 250, 250)',
                        'fontFamily': 'JetBrains Mono',
                        'backgroundColor': 'rgb(33, 33, 33)',
                        'border': 'solid',
                        'borderColor': 'rgb(41, 41, 41)',
                        'paddingLeft': '6px',
                        'paddingRight': '6px',
                        'paddingTop': '3px',
                        'paddingBottom': '3px',
                        'borderRadius': '4px',
                        'fontSize': '0.875rem'
                    },
                    'code::before': {
                        'content': '""',
                    },
                    'code::after': {
                        'content': '""',
                    },
                    a: {
                        color: '#FFFFFF',
                        textDecoration: 'underline',
                        textDecorationColor: '#61656C',
                        textUnderlineOffset: '6px',
                        textDecorationThickness: '2px',
                        transition: 'text-decoration-color 0.4s cubic-bezier(.4,0,.2,1)',
                        fontWeight: '500',
                    },
                    'a:hover': {
                        textDecorationColor: '#fff',
                    },
                    'table': {
                        'width': '100%',
                        'color': '#CECFD2',
                        'margin-bottom': '16px'
                    },
                    'table thead tr th': {
                        textAlign: 'left',
                        paddingRight: '0.5rem',
                        paddingBottom: '0.5rem',
                        paddingLeft: '0.5rem',
                    },
                    'table thead tr th:first-child': {
                        paddingLeft: '0',
                    },
                    'table thead tr th:last-child': {
                        paddingRight: '0',
                    },
                    'table tbody tr td': {
                        textAlign: 'left',
                        padding: '0.5rem',
                        borderBottomWidth: '1px',
                        borderBottomColor: 'rgb(41, 41, 41)',
                    },
                    'table tbody tr td:first-child': {
                        paddingLeft: '0',
                    },
                    'table tbody tr td:last-child': {
                        paddingRight: '0',
                    },
                    'table tbody tr:last-child': {
                        borderBottomWidth: '0',
                    }
                }
            },
            lg: {
                css: {
                    h1: {
                        'color': '#F7F7F7',
                        'font-size': '2rem',
                        'font-weight': 600,
                        'margin-top': '32px',
                        'margin-bottom': '16px',
                    },
                    'h1 a': {
                        'color': '#F7F7F7',
                        'font-size': '2rem',
                        'text-decoration': 'none',
                        'font-weight': 600,
                    },
                    h2: {
                        'color': '#F7F7F7',
                        'font-size': '1.875rem',
                        'font-weight': 600,
                        'margin-top': '40px',
                        'margin-bottom': '20px',
                    },
                    'h2 a': {
                        'color': '#F7F7F7',
                        'text-decoration': 'none',
                        'font-size': '1.875rem',
                        'font-weight': 600,
                    },
                    h3: {
                        'color': '#F7F7F7',
                        'font-size': '1.5rem',
                        'font-weight': 600,
                        'margin-top': '20px',
                        'margin-bottom': '10px',
                    },
                    'h3 a': {
                        'color': '#F7F7F7',
                        'font-size': '1.5rem',
                        'text-decoration': 'none',
                        'font-weight': 600,
                    },
                    h4: {
                        'color': '#F7F7F7',
                        'font-size': '1.125rem',
                        'font-weight': 600,
                        'margin-top': '20px',
                        'margin-bottom': '0px',
                    },
                    'h4 a': {
                        'color': '#F7F7F7',
                        'font-size': '1.125rem',
                        'text-decoration': 'none',
                        'font-weight': 600,
                    },
                    'ol': {
                        'list-style-type': 'decimal',
                        'margin-left': '1rem',
                        'margin-bottom': '16px'
                    },
                    'ol > li::marker': {
                        'color': '#CECFD2',
                    },
                    'ol > li': {
                        'color': '#CECFD2',
                        'margin-bottom': '6px'
                    },
                    'ol': {
                        'list-style-type': 'decimal',
                    },
                    'ul': {
                        'list-style-type': 'disc',
                        'margin-left': '1rem',
                        'margin-bottom': '16px'
                    },
                    'ul > li': {
                        'color': '#CECFD2',
                        'margin-bottom': '6px'
                    },
                    'code': {
                        'color': 'rgb(250, 250, 250)',
                        'fontFamily': 'JetBrains Mono',
                        'backgroundColor': 'rgb(33, 33, 33)',
                        'border': 'solid',
                        'borderColor': 'rgb(41, 41, 41)',
                        'paddingLeft': '6px',
                        'paddingRight': '6px',
                        'paddingTop': '3px',
                        'paddingBottom': '3px',
                        'borderRadius': '4px',
                        'fontSize': '1rem'
                    },
                    'code::before': {
                        'content': '""',
                    },
                    'code::after': {
                        'content': '""',
                    },
                    'table': {
                        'width': '100%',
                        'color': '#CECFD2',
                        'margin-bottom': '16px'
                    },
                    'table thead tr th': {
                        textAlign: 'left',
                        paddingRight: '0.5rem',
                        paddingBottom: '0.5rem',
                        paddingLeft: '0.5rem',
                    },
                    'table thead tr th:first-child': {
                        paddingLeft: '0',
                    },
                    'table thead tr th:last-child': {
                        paddingRight: '0',
                    },
                    'table tbody tr td': {
                        textAlign: 'left',
                        padding: '0.5rem',
                        borderBottomWidth: '1px',
                        borderBottomColor: 'rgb(41, 41, 41)',
                    },
                    'table tbody tr td:first-child': {
                        paddingLeft: '0',
                    },
                    'table tbody tr td:last-child': {
                        paddingRight: '0',
                    },
                    'table tbody tr:last-child': {
                        borderBottomWidth: '0',
                    }
                }
            }
        },
        extend: {
            boxShadow: {
                glow: '0 0 4px rgb(0 0 0 / 0.1)',
            },
            colors: {
                link: '#3B82F6'
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif']
            },
            maxWidth: {
                lg: '33rem',
                '2xl': '40rem',
                '3xl': '50rem',
                '5xl': '66rem',
            },
            opacity: {
                1: '0.01',
                2.5: '0.025',
                7.5: '0.075',
                15: '0.15',
            }
        }
    },
    plugins: [require("@tailwindcss/typography")],
    content: [
        "./components/**/*.{vue,js,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./composables/**/*.{js,ts}",
        "./plugins/**/*.{js,ts}",
        "./App.{js,ts,vue}",
        "./app.{js,ts,vue}",
        "./Error.{js,ts,vue}",
        "./error.{js,ts,vue}"
    ],
}