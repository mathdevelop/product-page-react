import React from 'react';
import { ReactComponent as ClearIcon } from '../../assets/svg/clear.svg';
import { useRecoilState } from 'recoil';
import { cartState } from '../../atoms';
import accounting from 'accounting';
import './styles.scss';

export default function Cart() {
    const [cart, setCart] = useRecoilState(cartState);

    const closeCart = () => {
        setCart({ ...cart, open: false });
    };

    const changeQuantity = (operation, index) => {
        const item = cart.items[index];
        const quantity = item.quantity + (operation === 'more' ? 1 : -1);

        if(quantity > 0) {
            setCart({ open: true, items: [...cart.items.slice(0, index), {...item, price: item.unit_price * quantity, quantity}, ...cart.items.slice(index + 1)] });
        }
    };

    const removeProduct = (index) => {
        setCart({ open: true, items: [...cart.items.slice(0, index), ...cart.items.slice(index + 1)] });
    };

    const getTotalItems = () => cart.items.reduce((a, b) => a + b.quantity, 0);

    const getTotalPrice = () => cart.items.reduce((a, b) => a + b.price, 0);

    return (
        <div id="orig-cart" className={ cart.open ? 'open' : '' }>
            <button className="clear" onClick={closeCart}><ClearIcon /></button>
            <div id="header">
                <div className="title">Sacola</div>
                <div className="total">{ getTotalItems() } Itens</div>
            </div>
            <div id="body">
                {cart.items.length === 0 &&
                    <span className="empty">Nenhum produto adicionado</span>
                }
                <ul className="products">
                    {cart.items.map((product, index) => (
                        <li key={ index } className="product">
                            <div className="image"><img src={ process.env.REACT_APP_IMAGES + product.image } alt="" /></div>
                            <div className="details">
                                <span className="name">{ product.name }</span>
                                <strong className="price">{ accounting.formatMoney(product.price, 'R$ ', 2, '.', ',') }</strong>
                                {Object.values(product.variations).map(variation => (
                                    <span key={ variation } className="variation">{ variation }</span>
                                ))}
                            </div>
                            <div className="quantity">
                                <button name="less" onClick={() => changeQuantity('less', index)}>-</button>
                                <input type="text" value={ product.quantity } readOnly />
                                <button name="more" onClick={() => changeQuantity('more', index)}>+</button>
                            </div>
                            <div className="remove">
                                <button onClick={() => removeProduct(index)}><ClearIcon /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="footer">
                <div className="shipping">
                    <span>Faltam R$ xx,xx para você</span>
                    <strong>Ganhar Frete Grátis</strong>
                </div>
                <div className="summary">
                    <div className="installment">
                        <strong>Total: { accounting.formatMoney(getTotalPrice(), 'R$ ', 2, '.', ',') }</strong>
                        {cart.items.length !== 0 &&
                            <span>até 3x de { accounting.formatMoney(getTotalPrice() / 3, 'R$ ', 2, '.', ',') } sem juros</span>
                        }
                    </div>
                    <div className="buy">
                        <button>Finalizar compra</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
