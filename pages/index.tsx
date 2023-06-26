import type { NextPage } from 'next';
import Home from '@/modules/home';
import Footer from '@/modules/home/components/Footer';

const HomePage: NextPage = () => {
    return (
        <>
            <Home />
            <Footer />
        </>
    );
};

export default HomePage;







