import React from 'react';

/**
 Renders the footer component of the website.
 @function
 @returns {JSX.Element} - Footer component JSX
 */
const Footer = () => {
    return (
        <div className={'mt-auto w-full py-6 px-8 flex justify-center bg-primary'}>
            <div className={'text-secondary text-sm'}>
                © {new Date().getFullYear()} {'Порисуем.рф'}. {'Все права защищены.'}
            </div>
        </div>
    );
};

export default Footer;
