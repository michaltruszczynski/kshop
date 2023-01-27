import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import BackgroundContent from '../BackgroundContent/BackgroundContent';

import styles from './Table.module.scss';

const Table = ({ tableData, columnsHeading, breakOn = 'medium', optionsColumn = false, emptyTableDataMessage = 'No data to display' }) => {
      // console.log(tableData)
      const { url, path } = useRouteMatch();
      // console.log('path: ', path, 'url: ', url);

      if (!tableData || tableData.length === 0) {
            return (
                  <BackgroundContent>
                        <h1>{emptyTableDataMessage}</h1>
                  </BackgroundContent>
            )
      }


      const renderTableHeading = () => {
            return columnsHeading.map((columnHeading, index) => {
                  return (
                        <th
                              className={styles['table__heading-column']}
                              key={`column-${index}`}
                        >
                              {columnHeading}
                        </th>
                  )
            })
      }

      const renderTableBody = () => {
            if (!tableData.length) {
                  return (
                        <tr><td>{emptyTableDataMessage}</td></tr>
                  );
            }

            return tableData.map((row, rowIndex) => {

                  const getRowData = () => {
                        const rowEntries = Object.entries(row);
                       
                        return rowEntries.map((data, index) => ({
                              key: columnsHeading[index],
                              value: data[1]
                        }));
                  }

                  const renderRow = () => {
                        // console.log('dupa')
                        return (
                              rowData.map((data, columnIndex) => {
                                    if (data.key === '#') {
                                          return (
                                                <td
                                                      className={styles['table__column']}
                                                      key={columnIndex}
                                                      data-heading={data.key}>
                                                      <span className={styles['table__column__item']}>{rowIndex + 1}</span>
                                                </td>
                                          )
                                    }

                                    return (
                                          <td
                                                className={styles['table__column']}
                                                key={columnIndex}
                                                data-heading={data.key}>
                                                <span className={styles['table__column__item']}>{data.value}</span>
                                          </td>
                                    )
                              })
                        )
                  }

                  const rowData = getRowData(row, columnsHeading);


                  // console.log(rowData)

                  return (
                        <tr className={styles['table__row']} key={`row-${rowIndex}`}>
                              {renderRow()}
                              {/* {optionsColumn ? (
                                    <td className={styles['table__column']} data-heading={'Options'}>
                                          <span className={styles['table__column__item']}>
                                                <Link to={`${optionsColumn.url}${row._id}`}>
                                                      {optionsColumn.linkName}
                                                </Link>
                                          </span>
                                    </td>
                              )
                                    : null} */}
                              {optionsColumn ? (
                                    <td className={styles['table__column']} data-heading={'Options'}>
                                          {
                                                optionsColumn.map(option => {
                                                      return (
                                                            <span className={styles['table__column__item']}>
                                                                  <Link to={`${option.url}${row._id}`}>
                                                                        {option.linkName}
                                                                  </Link>
                                                            </span>
                                                      )
                                                })
                                          }
                                          {
                                                // <span className={styles['table__column__item']}>
                                                //                   <i className='bx bx-file-find' ></i>
                                                //                   <i className='bx bxs-edit'></i>
                                                //                   <i className='bx bxs-box'></i>
                                                //                   {/* <i className='bx bxs-box'></i> */}
                                                //                   <i className='bx bxs-circle'></i>
                                                //             </span>
                                          }
                                    </td>
                              )
                                    : null}
                        </tr >
                  )
            });
      }

      const optionsField = (type, linkName) => {

            let linkIcon = null;
            switch (type) {
                  case 'view':
                  //doc <i class='bx bx-file-find' ></i>
                  case 'edit':
                  //edit <i class='bx bxs-edit'></i>
                  case 'inStock':
                  //add element    <i class='bx bxs-box'></i>
                  case 'outOfStock':
                  //add element    <i class='bx bxs-box'></i>
                  case 'available':
                  //product available <i class='bx bxs-circle'></i>
                  case 'notAvailable':
                  //product available <i class='bx bxs-circle'></i>
                  default:
                        return null
            }

            return linkIcon;
      }

      const setTableClass = () => {
            let tableClass = [styles['table']]
            if (breakOn === 'small') {
                  tableClass.push(styles['table--break-xs']);
            } else if (breakOn === 'medium') {
                  tableClass.push(styles['table--break-m']);
            } else if (breakOn === 'large') {
                  tableClass.push(styles['table--break-l']);
            }

            return tableClass.join(' ')
      }

      return (
            <div className={styles['table-container']}>
                  <table className={setTableClass()}>
                        <thead className={styles['table__heading']}>
                              <tr className={styles['table__heading-row']}>
                                    {renderTableHeading()}
                                    {optionsColumn ? <th className={styles['table__heading-column']} key={`column-${'options'}`}>Options</th> : null}
                              </tr>
                        </thead>
                        <tbody>
                              {renderTableBody()}
                        </tbody>
                  </table>
            </div>
      )
}

Table.propTypes = {
      tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
      columnsHeading: PropTypes.arrayOf(PropTypes.string).isRequired,
      breakOn: PropTypes.oneOf(['small', 'medium', 'large']),
      optionsColumn: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.array])
}

export default Table;