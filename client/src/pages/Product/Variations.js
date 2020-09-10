import React from 'react';
import { useRecoilState } from 'recoil';
import { temporaryCartState } from '../../atoms';

export default function Variations(props) {
    const [temporaryCart, setTemporaryCart] = useRecoilState(temporaryCartState);

    const addSelection = (attribute, value) => {
        setTemporaryCart({ ...temporaryCart, variations: { ...temporaryCart.variations, [attribute]: value }});
    };

    return (
        <div className="variations">
            {props.variations.map((variation, index) => (
                <React.Fragment key={ index }>
                    {variation.type === 'color' &&
                        <div className="attribute">
                            <span>Cor:</span>
                            <strong>{ temporaryCart.variations.color ?  '(' + temporaryCart.variations.color + ')' : '' }</strong>
                            <div className="color">
                                {variation.attributes.map((attribute, index) => (
                                    <React.Fragment key={ index }>
                                        <input type="radio" id={ 'color-' + (index + 1) } name="color" value={ attribute.name } />
                                        <label htmlFor={ 'color-' + (index + 1) } style={{ backgroundColor: attribute.value }} onClick={() => addSelection('color', attribute.name)}></label>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    }
                    {variation.type === 'size' &&
                        <div className="attribute">
                            <span>Tamanho:</span>
                            <strong>{ temporaryCart.variations.size ?  '(' + temporaryCart.variations.size + ')' : '' }</strong>
                            <a href="/#">Guia de medidas</a>
                            <div className="size">
                                {variation.attributes.map((attribute, index) => (
                                    <React.Fragment key={ index }>
                                        <input type="radio" id={ 'size-' + (index + 1) } name="size" value={ attribute } />
                                        <label htmlFor={ 'size-' + (index + 1) } onClick={() => addSelection('size', attribute)}>{ attribute }</label>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    }
                </React.Fragment>
            ))}
        </div>
    );
}
