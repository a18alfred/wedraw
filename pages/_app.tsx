import '../shared/styles/global.css';
import 'react-tooltip/dist/react-tooltip.css';

import { MotionConfig } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { ModalManager } from '@/modules/modal';
import { Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { useEffect } from 'react';

const App = ({ Component, pageProps }: AppProps) => {

    useEffect(() => {
        const handleGestureStart = (e: Event) => {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            if ('zoom' in document.body.style) {
                (document.body.style as CSSStyleDeclaration & { zoom: string }).zoom = '1';
            }
        };

        const handleGestureChange = (e: Event) => {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            if ('zoom' in document.body.style) {
                (document.body.style as CSSStyleDeclaration & { zoom: string }).zoom = '1';
            }
        };

        const handleGestureEnd = (e: Event) => {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            if ('zoom' in document.body.style) {
                (document.body.style as CSSStyleDeclaration & { zoom: string }).zoom = '1';
            }
        };

        document.addEventListener('gesturestart', handleGestureStart);
        document.addEventListener('gesturechange', handleGestureChange);
        document.addEventListener('gestureend', handleGestureEnd);

        return () => {
            document.removeEventListener('gesturestart', handleGestureStart);
            document.removeEventListener('gesturechange', handleGestureChange);
            document.removeEventListener('gestureend', handleGestureEnd);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Порисуем.рф | Доска для рисования</title>
                <meta name='viewport'
                      content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no' />
            </Head>
            <RecoilRoot>
                <ToastContainer
                    autoClose={1000}
                    transition={Slide}
                    toastStyle={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}
                />
                <MotionConfig transition={{ ease: 'easeOut' }}>
                    <ModalManager />
                    <Component {...pageProps} />
                </MotionConfig>
            </RecoilRoot>
        </>
    );
};

export default App;
