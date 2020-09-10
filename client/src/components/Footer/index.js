import React from 'react';
import { ReactComponent as FacebookIcon } from '../../assets/svg/facebook.svg';
import { ReactComponent as InstagramIcon } from '../../assets/svg/instagram.svg';
import { ReactComponent as PinterestIcon } from '../../assets/svg/pinterest.svg';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';
import vtex from '../../assets/img/vtex.png';
import ebit from '../../assets/img/ebit.png';
import './styles.scss';

export default function Footer() {
    return (
        <footer id="orig-footer">
            <div id="row-1" className="row no-gutters">
                <div id="social">
                    <FacebookIcon />
                    <InstagramIcon />
                    <PinterestIcon />
                </div>
            </div>
            <div id="row-2" className="row no-gutters">
                <div className="column">
                    <div id="seals">
                        <img src={ vtex } alt="" />
                        <img src={ ebit } alt="" />
                    </div>
                </div>
                <div className="column">
                    <h2>Institucional</h2>
                    <ul>
                        <li><a href="/#">A Marca</a></li>
                        <li><a href="/#">Lojas</a></li>
                        <li><a href="/#">Contato</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h2>Informações</h2>
                    <ul>
                        <li><a href="/#">Formas de Pagamento</a></li>
                        <li><a href="/#">Trocas e Devoluções</a></li>
                        <li><a href="/#">Cuidados Com o Produto</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h2>Conheça</h2>
                    <ul>
                        <li><a href="/#">Franquias e Multimarcas</a></li>
                        <li><a href="/#">Trabalhe com a Gente</a></li>
                        <li><a href="/#">Procon-RJ</a></li>
                    </ul>
                </div>
                <div className="column">
                    <div id="newsletter">
                        <h3>Assine nossa News</h3>
                        <form>
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name" name="name" placeholder="Renata" />
                            <input type="text" id="email" name="email" placeholder="E-mail" />
                            <button>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div id="row-3" className="row no-gutters">
                <div id="copyright">
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas molestie massa in nunc condimentum, vel placerat lacus pulvinar. Suspendisse vel nisl eu tortor feugiat tempus vel in tortor. Nunc semper leo nec tellus gravida faucibus.</span>
                    <LogoIcon />
                </div>
            </div>
        </footer>
    );
}
