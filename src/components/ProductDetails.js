import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import ClassicTee from '../assets/images/classic-tee.jpg'

const ProductDetails = () => {

    // States
    const [size, setSize] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [cartStatus, setCartStatus] = useState('');

    useEffect(() => {
    }, [cartItems]);

    // Methods
    const addToCart = (name, price) => { 
        if (size === '' || size === 'Please choose a size.') {
            setSize('Please choose a size.');
        } else {
            let oldItemFlag = 0;
            if (cartItems.length > 0) {
                cartItems.forEach(function (item, index) {
                    if (item.product_size === size) {
                        let shallowItems = [...cartItems];
                        let shallowItem = {
                            ...shallowItems[index],
                            count: item.count + 1
                        }
                        shallowItems[index] = shallowItem
                        setCartItems(shallowItems);
                        oldItemFlag = 1;
                    }
                })
            }
    
            if (oldItemFlag !== 1) {
                setCartItems([
                    ...cartItems,
                    {
                        product_name: name,
                        product_price: price,
                        product_size: size,
                        count: 1
                    }
                ]);
            }
    
            setSize('');
        }
    }

    return (
        <>
            <header className='header'>
                <div className={classnames('cart-lbl', {
                    active : cartStatus === 'active' 
                })} onMouseEnter={() => {
                    cartItems.length !== 0 && setCartStatus('active')
                }}>
                    My Cart ( {cartItems.reduce((total, obj) => obj.count + total,0)} )

                    <div className='cart-container'>
                        {
                            cartItems.length !== 0 && cartItems.map((item, i ) => {
                                return (
                                    <div key={i} className="cart-item">
                                        <img src={ClassicTee} className="item-img" alt={item.product_name} />
                                        <div className='cart-item-details'>
                                            <p>{item.product_name}</p>
                                            <p>{item.count} x <span className='product-price'>${item.product_price}</span></p>
                                            <p>Size: {item.product_size}</p>    
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </header>
            <div className='details-container'>
                <img 
                    src={ClassicTee} 
                    className="img-product"
                    alt="classic-tee" />
                <div className='product-details-container'>
                    <p className='product-name'>
                        Classic Tee
                    </p>
                    <p className='product-price'>
                        $75.00
                    </p>
                    <p className='product-details'>
                        Dolor sit amet, consectetur adipiscing elit. Aenean tincidunt tortor et lacus finibus consectetur. Aenean at mi non neque rutrum dignissim. Etiam non congue metus, sit amet finibus eros. Maecenas rutrum nec tortor id suscipit. Proin sed tortor ut ante congue placerat.
                    </p>
                    <div className='product-options'>
                        <p className='product-size'>
                            SIZE <span className='required-star'>*</span> <span className='size-selected'>{size}</span>
                        </p>
                        <div className='sizing-options'>
                            <div className={size === 'S' && 'active'} onClick={() => {setSize('S')}}>
                                S
                            </div>
                            <div className={size === 'M' && 'active'} onClick={() => {setSize('M')}}>
                                M
                            </div>
                            <div className={size === 'L' && 'active'} onClick={() => {setSize('L')}}>
                                L
                            </div>
                        </div>
                        <button className='btn-cart' onClick={() => addToCart('Classic Tee', 75)}>
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails