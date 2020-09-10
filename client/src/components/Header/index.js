import React from 'react';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';
import { ReactComponent as MenuIcon } from '../../assets/svg/menu.svg';
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg';
import { ReactComponent as CartIcon } from '../../assets/svg/cart.svg';
import Categories from './Categories';
import { useRecoilState } from 'recoil';
import { cartState } from '../../atoms';
import './styles.scss';

export default function Header() {
    const [cart, setCart] = useRecoilState(cartState);

    const openCart = () => {
        setCart({ ...cart, open: true });
    };

    const getTotalItems = () => cart.items.reduce((a, b) => a + b.quantity, 0);

    return (
        <header id="orig-header">
            <div id="logo">
                <LogoIcon />
            </div>
            <div id="menu">
                <div id="links">
                    <a href="/#">Entrar</a>
                    <a href="/#">Cadastrar-se</a>
                </div>
                <div id="open">
                    <button><MenuIcon /></button>
                </div>
                <Categories />
                <div id="actions">
                    <div id="search">
                        <form>
                            <input type="text" placeholder="Busca"></input>
                            <button><SearchIcon /></button>
                        </form>
                    </div>
                    <div id="cart">
                        <button onClick={openCart}><CartIcon /></button>
                        <span>{ getTotalItems() }</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
