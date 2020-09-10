import React from 'react';
import { useRecoilValue } from 'recoil';
import { lightboxState, cartState } from './atoms';
import Header from './components/Header';
import Product from './pages/Product';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import Cart from './components/Cart';

export default function App() {
    const lightbox = useRecoilValue(lightboxState),
          cart = useRecoilValue(cartState);

    return (
        <div id="app" className={ lightbox.open || cart.open ? 'open' : '' }>
            <Header />
            <Product />
            <Footer />
            { lightbox.open &&
                <Lightbox />
            }
            <Cart />
        </div>
    );
}
