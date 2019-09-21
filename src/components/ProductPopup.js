import React from 'react'
import SelectForm from './SelectForm'

const ProductPopup = ({
  node,
  numOptions,
  productSelect,
  quantity,
  setQuantity,
  handleCloseProductSelect,
  handleAddToCart
}) => {
  return (
    <div>

    <div className='popup-background'></div>

    <section
        id='product-select'
        ref={node}
      >
        
        <div
          className='product-close-wrapper'>
          <div
            className='product-close'
            onClick={(event) => handleCloseProductSelect()}
          >
            X
          </div>
        </div>
          
        <div className='product-image-wrapper'>
          <img 
            className='product-image'
            src={productSelect.image}
            alt='product'
          ></img>
        </div>

        <div className='product-name'>
          {productSelect.name}
        </div>

        <div className='product-type'>
          {productSelect.product_type}
        </div>
      
        <div className='product-price'>
          <span>
            ${productSelect.price.toFixed(2)}
          </span>
        </div>

        <div className='quantity-add-wrapper'>
          <div className='quantity-select'>
            <span>
              Quantity:
            </span>
            <SelectForm
              value={quantity}
              handleChange={({ target }) => setQuantity(Number(target.value))}
              numOptions={numOptions}
            />
          </div>

          <div className='cart-add-wrapper'>
            <div
              onClick={(event) => handleAddToCart(productSelect.id, quantity)}
              className='cart-add-button'
            >
              Add to Cart
            </div>
          </div>

        </div>
        
      </section>

    </div>
    
  )
}

export default ProductPopup