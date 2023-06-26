module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './shared/**/*.{js,ts,jsx,tsx}',
        './modules/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            extra: '6rem',
        },
        extend: {
            colors: {
                primary: '#050816',
                secondary: '#aaa6c3',
                tertiary: '#151030',
                grey: '#EEEEEE',
                'black-100': '#100d25',
                'black-200': '#090325',
                'white-100': '#f3f3f3',
            },
            width: {
                160: '40rem',
            },
            backgroundImage: {
                'hero-pattern': 'url(\'/assets/images/homebg.webp\')',
            },
            screens: {
                xs: '450px',
            },
            boxShadow: {
                card: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                custom: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
                picker: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
            },
            zIndex: {
                'canvas-main': '1',
                'canvas-cache': '2',
                'canvas-client': '3',
                'mouse-user': '5',
                'image': '10',
                'selection': '10',
                'mouse-pos': '15',
                'map': '20',
                'toolbar': '25',
                'selection-shape': '26',
                'chat-alert': '29',
                'chat-small': '30',
                'control': '35',
                'chat-full': '40',
                'modal': '50',
            },
            borderColor: {
                breaker: 'rgba(225,230,239,0.09)',
                selection: 'rgb(74,54,182)',
            },
        },
        fontFamily: {
            montserrat: ['Montserrat', 'sans-serif'],
        },
    },
    plugins: [],
};
