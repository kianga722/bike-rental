import React from 'react'

const ProductList = ({
  products,
  filter,
  setProductSelect,
  withinFilter,
}) => {
  return (
    <section id='product-list'>
      {
        products.map(product => (
          withinFilter(product, filter) &&
          <div
            key={product.id}
            className='product'
            onClick={(event) => setProductSelect(product)}
          >
            
            <div className='product-image-wrapper'>
              <img 
                className='product-image'
                src={product.image}
                alt='product'
              ></img>
            </div>

            <div className='product-info-wrapper'>
              <div className='product-name'>
                {product.name}
              </div>

              <div className='product-type'>
                {product.product_type}
              </div>

              <div className='product-price'>
                <span>
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

          </div>
        ))
      }
    </section>
  )
}

export default ProductList