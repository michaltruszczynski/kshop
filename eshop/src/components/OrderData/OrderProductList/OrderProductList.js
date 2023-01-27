import React from 'react'

import OrderItem from '../OrderItem/OrderItem'

const OrderProductList = ({orderProducts}) => {

      return (
            <ul>
                  {orderProducts.map(product => (
                        <OrderItem
                              key={product.productId}
                              productData={product}
                        />
                  ))}
            </ul>
      )
}

export default OrderProductList;