import React from 'react';

import Table from '../Table/Table';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useFetch from '../../hooks/useFetch';

const capitalize = word => {
      if (!word) return '';
      const loweredCase = word.toLowerCase();
      return loweredCase.charAt(0).toUpperCase() + loweredCase.slice(1)
}

const UserListTable = () => {
      const [state] = useFetch('/admin/users');
      const { status, error } = state;
      console.log(status)

      // tableData = [ {_id: 12345, colVal_1, colVal_2, colVal_3, ...}, {...}]

      const userTableColumnsHeadings = ['#', 'Name', 'Email', 'Role', 'Options'];

      const userTableOptions = {
            linkUrl: '/admin/edituser/',
            icons: {
                  isEditable: true
            }
      }

      console.log('[UserListTable], rendering', state)

      const getUserTableData = () => {
            if (!state?.data?.users) return [];

            return state.data.users.map(user => {
                  return {
                        _id: user._id,
                        userName: user.name,
                        userEmail: user.email,
                        userRole: capitalize(user.userRole.name),
                        options: {
                              isOwner: true
                        }
                  }
            });
      }

      const emptySizeSystemTableMessage = 'No users found. '

      return (
            <AsyncOpBgComponent status={status} error={error}>
                  <Table
                        tableData={getUserTableData()}
                        state={state}
                        columnsHeading={userTableColumnsHeadings}
                        options={userTableOptions}
                        breakOn="medium"
                        emptyTableDataMessage={emptySizeSystemTableMessage} />
            </AsyncOpBgComponent>
      )
}

export default UserListTable