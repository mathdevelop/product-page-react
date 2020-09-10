import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import Variations from './Variations';
import Related from './Related';
import api from '../../services/api';
import accounting from 'accounting';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { temporaryCartState, cartState, lightboxState } from '../../atoms';
import './styles.scss';

export default function Product() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [temporaryCart, setTemporaryCart] = useRecoilState(temporaryCartState);
    const [cart, setCart] = useRecoilState(cartState);
    const [lightbox, setLightbox] = useRecoilState(lightboxState);

    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get('/products/1');
     
            setProduct(response.data);

            document.title = document.title + ' - ' + response.data.name;

            setTemporaryCart({ id: 1, name: response.data.name, image: response.data.images[0], price: response.data.price, unit_price: response.data.price, variations: {} });

            response = await api.get(`/categories/${ response.data.category }`);

            setCategory(response.data);
        };
     
        fetchData();
    }, []);

    const addCart = () => {
        if(Object.keys(temporaryCart.variations).length) {
            const index = cart.items.findIndex(item => JSON.stringify(item.variations) === JSON.stringify(temporaryCart.variations));

            if(index !== -1) {
                const quantity = cart.items[index].quantity + 1;

                setCart({ open: false, items: [...cart.items.slice(0, index), {...temporaryCart, price: cart.items[index].unit_price * quantity, quantity}, ...cart.items.slice(index + 1)] });
            } else {
                setCart({ open: false, items: [...cart.items, {...temporaryCart,  'quantity': 1}] });
            }

            setLightbox({ open: true });
        } else {
            Swal.fire(
                'Adicionar à Sacola',
                'Selecione uma variação',
                'warning'
            );
        }
    };

    return (
        <div id="orig-product">
            <div id="breadcumb">
                <a href="/#">Home</a>
                <a href="/#">{ category.name }</a>
            </div>
            <div id="container">
                <div id="column-1" className="column">
                    {product.images &&
                        <Gallery images={ product.images } video={ product.video } />
                    }
                </div>
                <div id="column-2" className="column">
                    <div id="details">
                        <div className="mobile-header">
                            <h1 className="name">{ product.name }</h1>
                            <div className="sku">{ product.sku }</div>
                        </div>
                        <div className="price">
                            <span>{ accounting.formatMoney(product.price, 'R$ ', 2, '.', ',') }</span>
                            <strong>{ accounting.formatMoney(product.promotional_price, 'R$ ', 2, '.', ',') }</strong>
                        </div>
                        {product.installment &&
                            <div className="installment">Ou { product.installment.plots }x de { accounting.formatMoney(product.installment.value, 'R$ ', 2, '.', ',') }</div>
                        }
                        {product.variations &&
                            <Variations variations={ product.variations } />
                        }
                        <div className="buy">
                            <button onClick={addCart}>Adicionar à sacola</button>
                        </div>
                        <div className="description">{ product.description }</div>
                    </div>
                </div>
            </div>
            {product.related &&
                <Related related={ product.related } />
            }
        </div>
    );
}
