import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import api from '../../services/api';
import accounting from 'accounting';

export default function Related(props) {
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            for(const id of props.related) {
                const response = await api.get(`/products/${ id }`);
     
                setRelated(items => items.concat(response.data));
            }
        };
     
        fetchData();
    }, [props.related]);

    const settings = {
        infinite: false,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    infinite: true,
                    slidesToShow: 2,
                    vertical: false
                }
            }
        ]
    };

    return (
        <div id="related">
            <div id="title">Quem viu, viu também</div>
            <div id="showcase">
                <Slider {...settings}>
                    {related.map(product => (
                        <div key={ product.id } className="product">
                            <div className="image">
                                <img src={ process.env.REACT_APP_IMAGES + product.images[0] } alt="" />
                            </div>
                            <div className="price">{ accounting.formatMoney(product.price, 'R$ ', 2, '.', ',') }</div>
                            {product.variations.map(variation => (
                                <div key={ variation.type } className="variations">
                                    {variation.type === 'color' && variation.attributes.map(attribute => (
                                        <span key={ attribute.name } style={{ backgroundColor: attribute.value }}></span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </Slider>
                <span className="count">1 de 2</span>
            </div>
        </div>
    );
}
