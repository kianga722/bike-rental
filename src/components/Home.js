import React, { useState, useEffect, useRef } from 'react'
import Filter from './Filter'
import ProductList from './ProductList';
import ProductPopup from './ProductPopup';

const Home = ({
  numOptions,
  products,
  productSelect,
  quantity,
  setProductSelect,
  setQuantity,
  handleCloseProductSelect,
  handleAddToCart,
}) => {
  const [filter, setFilter] = useState('none')

  const withinFilter = (product, filter) => {
    if (filter === 'none') {
      return true
    }
    return product.product_type === filter ? true : false
  }

  const node = useRef();
  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    handleCloseProductSelect()
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>

      <div className='page-title'>
        Products
      </div>
      
      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <ProductList
        products={products}
        filter={filter}
        setProductSelect={setProductSelect}
        withinFilter={withinFilter}
      />

      {
        productSelect !== null &&
        <ProductPopup
          node={node}
          numOptions={numOptions}
          productSelect={productSelect}
          quantity={quantity}
          setQuantity={setQuantity}
          handleCloseProductSelect={handleCloseProductSelect}
          handleAddToCart={handleAddToCart}
        />
      }

    </div>
  )
}

export default Home