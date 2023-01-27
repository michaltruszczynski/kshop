import { useSelector } from 'react-redux';

import Table from '../Table/Table';
// import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

const OrderListTable = () => {
      const orders = useSelector(state => state.auth.orders)
      console.log(orders)

      const orderTableColumnsHeadings = ['#', 'Date', 'Products quantity', 'Product category', 'Total Price', 'Options'];

      const sizeSystemTableOptions = {
            linkUrl: '/order/'
      }

      const getOrderTableData = () => {
            if (!orders) return [];

            return orders.map(orderItem => {
                  const date = new Date(orderItem.createdAt);
                  const productQuantity = orderItem.products.reduce((totalQuantity, item) => {
                        return totalQuantity = totalQuantity + item.quantity
                  }, 0);

                  const productCategories = orderItem.products.reduce((categories, item) => {
                        return categories = categories + ' ' + item.productCategory
                  }, '');

                  return {
                        _id: orderItem._id,
                        orderDate: new Intl.DateTimeFormat('pl-PL').format(date),
                        productQuantity: productQuantity,
                        orderProductTypes: productCategories.trim(),
                        orderTotalPrice: orderItem.orderTotal,
                        options: {}

                  }
            });
      }

      const emptyOrderTableMessage = 'No orders have been made yet.'
      console.log(getOrderTableData())

      return (
            <>
                  <Table
                        tableData={getOrderTableData()}
                        // tableData={[]}
                        columnsHeading={orderTableColumnsHeadings}
                        options={sizeSystemTableOptions}
                        breakOn="medium"
                        emptyTableDataMessage={emptyOrderTableMessage} />
            </>
      )
}

export default OrderListTable