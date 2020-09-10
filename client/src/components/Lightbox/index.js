import React from 'react';
import { ReactComponent as ClearIcon } from '../../assets/svg/clear.svg';
import { useRecoilValue, useRecoilState } from 'recoil';
import { temporaryCartState, cartState, lightboxState } from '../../atoms';
import './styles.scss';

export default function Lightbox() {
    const temporaryCart = useRecoilValue(temporaryCartState);
    const [cart, setCart] = useRecoilState(cartState);
    const [lightbox, setLightbox] = useRecoilState(lightboxState);

    const openCart = () => {
        closeLightbox();
        
        setCart({ ...cart, open: true });
    };
    
    const closeLightbox = () => {
        setLightbox({ open: false });
    };

    return (
        <div id="orig-lightbox">
            <button className="clear" onClick={closeLightbox}><ClearIcon /></button>
            <div className="image">
                <img src={ process.env.REACT_APP_IMAGES + temporaryCart.image } alt="" />
            </div>
            <div className="title">Produto adicionado com sucesso!</div>
            <div className="actions">
                <button className="open" onClick={openCart}>Finalizar Compra</button>
                <button className="continue" onClick={closeLightbox}>Continuar Comprando</button>
            </div>
        </div>
    );
}
