import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import OrderProductList from './OrderProductList/OrderProductList';
import TotalPriceSummary from './TotalPriceSummary/TotalPriceSummary';
import BackgroundContent from '../BackgroundContent/BackgroundContent';
import ButtonLink from '../ButtonLink/ButtonLink';

import styles from './OrderData.module.scss';


const OrderDetails = () => {
      const orders = useSelector(state => state.auth.orders);
      const { id } = useParams();

      const getOrderById = (orders = [], id) => {
            if (!id) return null;
            let selectedOrderByIdArr = [];
            selectedOrderByIdArr = orders.filter(order => order._id === id);
            if (!selectedOrderByIdArr.length) return null;
            const order = selectedOrderByIdArr[0]
            return order;
      }

      const selectedOrder = getOrderById(orders, id);

      if (!selectedOrder) {
            return (
                  <BackgroundContent>
                        <h1>Selected order not found.</h1>
                  </BackgroundContent>
            )
      }

      const { orderSubTotal, orderTotal, priceDiscount, shippingCost, products } = selectedOrder;

      return (
            <>
                  <p className={styles['order-number']}><b>Order no:</b> {id}</p>
                  <div className={styles['order-container']}>
                        <OrderProductList orderProducts={products} />
                        <TotalPriceSummary
                              productsSubTotalPrice={orderSubTotal}
                              priceDiscount={priceDiscount}
                              shippingCost={shippingCost}
                              productsTotalPrice={orderTotal}
                        />
                  </div>
                  <div className={styles['order-link-container']}>
                        <ButtonLink linkPath="/user" buttonStyle='square'>
                              Back to orders list
                        </ButtonLink>
                  </div>
            </>
      )
}

export default OrderDetails;