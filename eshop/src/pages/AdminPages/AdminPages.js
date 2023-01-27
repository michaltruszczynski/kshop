import React from 'react';
import { useRouteMatch, Switch } from 'react-router-dom';

import ProductsList from './ProductsList/ProductsList';
import EditProduct from './EditProduct/EditProduct';
import EditBrand from './EditBrand/EditBrand';
import SizeSystemList from './SizeSystemList/SizeSystemList';
import EditSizeChartSystem from './EditSizeChartSystem/EditSizeChartSystem';
import BrandList from './BrandList/BrandList';
import UserList from './UserList/UserList';
import EditUser from './EditUser/EditUser';

import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

const AdminPages = () => {
      const { path } = useRouteMatch();

      return (
            <Switch>
                  <ProtectedRoute path={`${path}/addproduct`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <EditProduct />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/editproduct/:id`} allowedRoles={['employee', 'admin']} onlyAuth={true}>
                        <EditProduct />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/products`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <ProductsList />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/addsizesystem`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <EditSizeChartSystem />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/editsizesystem/:id`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <EditSizeChartSystem />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/sizesystems`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <SizeSystemList />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/addbrand`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <EditBrand />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/editbrand/:id`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <EditBrand />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/brands`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <BrandList />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/users`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <UserList />
                  </ProtectedRoute>
                  <ProtectedRoute path={`${path}/edituser/:id`} allowedRoles={['employee', 'admin']} onlyAuth={true} >
                        <EditUser />
                  </ProtectedRoute>
            </Switch>
      )
}

export default AdminPages;