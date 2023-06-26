import { Html, Main, NextScript, Head } from 'next/document';

const document = () => (
    <Html>
        <Head>
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link
                rel='preconnect'
                href='https://fonts.gstatic.com'
                crossOrigin=''
            />
            <link
                href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap'
                rel='stylesheet'
            />
            <link rel='manifest' href='/manifest.json' />

            <meta name='theme-color' content='#050816' />

            <meta name='title' content='Порисуем.рф' />
            <meta name='description'
                  content='Онлайн-доска для рисования, позволяющая пользователям создавать комнаты и рисовать с друзьями в режиме реального времени. Получите удовольствие от коллективного творчества с помощью этого интерактивного приложения!' />

            <meta property='og:type' content='website' />
            <meta property='og:url' content='https://xn--e1afnfehiq.xn--p1ai/' />
            <meta property='og:title' content='Порисуем.рф' />
            <meta property='og:description'
                  content='Онлайн-доска для рисования, позволяющая пользователям создавать комнаты и рисовать с друзьями в режиме реального времени. Получите удовольствие от коллективного творчества с помощью этого интерактивного приложения!' />
            <meta property='og:image'
                  content='/assets/images/social_media_card.webp' />

            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:url' content='https://xn--e1afnfehiq.xn--p1ai/' />
            <meta property='twitter:title' content='Порисуем.рф' />
            <meta property='twitter:description'
                  content='Онлайн-доска для рисования, позволяющая пользователям создавать комнаты и рисовать с друзьями в режиме реального времени. Получите удовольствие от коллективного творчества с помощью этого интерактивного приложения!' />
            <meta property='twitter:image'
                  content='/assets/images/social_media_card.webp' />

            <link rel='icon' href='/assets/images/favicon.ico' />
            <link rel='apple-touch-icon' sizes='192x192' href='/assets/images/logo192.png' />
            <link rel='apple-touch-icon' sizes='512x512' href='/assets/images/logo512.png' />

            <link rel='preload' href='/assets/fonts/Montserrat-Var.ttf' as='font' type='font/ttf' crossOrigin='' />

            <meta name='apple-mobile-web-app-capable' content='yes' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2048-2732.png'
                  media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2732-2048.png'
                  media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1668-2388.png'
                  media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2388-1668.png'
                  media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1536-2048.png'
                  media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2048-1536.png'
                  media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1668-2224.png'
                  media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2224-1668.png'
                  media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1620-2160.png'
                  media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2160-1620.png'
                  media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1290-2796.png'
                  media='(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2796-1290.png'
                  media='(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1179-2556.png'
                  media='(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2556-1179.png'
                  media='(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1284-2778.png'
                  media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2778-1284.png'
                  media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1170-2532.png'
                  media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2532-1170.png'
                  media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1125-2436.png'
                  media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2436-1125.png'
                  media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1242-2688.png'
                  media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2688-1242.png'
                  media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-828-1792.png'
                  media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1792-828.png'
                  media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1242-2208.png'
                  media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-2208-1242.png'
                  media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-750-1334.png'
                  media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1334-750.png'
                  media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-640-1136.png'
                  media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' />
            <link rel='apple-touch-startup-image' href='assets/images/splash/apple-splash-1136-640.png'
                  media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)' />
        </Head>
        <body>
        <div id='portal'></div>
        <Main />
        <NextScript />
        </body>
    </Html>
);

export default document;
