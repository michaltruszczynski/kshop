import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BackgroundContent from '../BackgroundContent/BackgroundContent';

import styles from './Table.module.scss';

const Table = ({ tableData, columnsHeading, breakOn = 'medium', options, emptyTableDataMessage = 'No data to display' }) => {

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
                              key={`column-${columnHeading}`}
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

                  const rowData = getRowData(row, columnsHeading);
                  //render sigle row
                  const renderRow = () => {
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

                                    if (data.key === 'Options') {
                                          let informationIcons = [<i key="bx-file-find" className={['bx bx-file-find', styles['icon'], styles['icon--green']].join(' ')} ></i >]

                                          if (data.value.isOwner && data.value.hasOwnProperty('isOwner')) {
                                                informationIcons.push(<i key="bxs-edit-green" className={['bx bxs-edit', styles['icon'], styles['icon--green']].join(' ')}></i>)
                                          }
                                          if (!data.value.isOwner && data.value.hasOwnProperty('isOwner')) {
                                                informationIcons.push(<i key="bxs-edit-red" className={['bx bxs-edit', styles['icon'], styles['icon--red']].join(' ')}></i>)
                                          }
                                          if (data.value.inOffer && data.value.hasOwnProperty('inOffer')) {
                                                informationIcons.push(<i key="bxs-circle-green" className={['bx bxs-circle', styles['icon'], styles['icon--green']].join(' ')}></i>)
                                          }
                                          if (!data.value.inOffer && data.value.hasOwnProperty('inOffer')) {
                                                informationIcons.push(<i key="bxs-circle-red" className={['bx bxs-circle', styles['icon'], styles['icon--red']].join(' ')}></i>)
                                          }
                                          if (data.value.inStock && data.value.hasOwnProperty('inStock')) {
                                                informationIcons.push(<i key="bxs-box-green" className={['bx bxs-box', styles['icon'], styles['icon--green']].join(' ')}></i>)
                                          }
                                          if (!data.value.inStock && data.value.hasOwnProperty('inStock')) {
                                                informationIcons.push(<i key="bxs-box-red" className={['bx bxs-box', styles['icon'], styles['icon--red']].join(' ')}></i>)
                                          }

                                          return (
                                                <td
                                                      className={styles['table__column']}
                                                      key={columnIndex}
                                                      data-heading={data.key}>
                                                      <Link to={`${options.linkUrl}${row._id}`} className={styles['table__link']}>
                                                            <span className={styles['table__column__item']}>{informationIcons}</span>
                                                      </Link>
                                                </td >
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

                  return (
                        <tr className={styles['table__row']} key={`row-${rowIndex}`}>
                              {renderRow()}
                        </tr>
                  )
            });
      }

      const setTableClass = () => {
            let tableClass = [styles['table']];

            if (breakOn === 'small') {
                  tableClass.push(styles['table--break-xs']);
            } else if (breakOn === 'medium') {
                  tableClass.push(styles['table--break-m']);
            } else if (breakOn === 'large') {
                  tableClass.push(styles['table--break-l']);
            }

            return tableClass.join(' ')
      }

      const renderHeadingIcons = () => {
            let headingIcons = [];
            if (options.linkUrl) {
                  headingIcons.push(
                        <span key="view">
                              <i className={['bx bx-file-find', styles['icon'], styles['icon--green']].join(' ')} ></i > View
                        </span>
                  )
            }
            if (options.icons?.isEditable) {
                  headingIcons.push(
                        <span key="edit">
                              <i className={['bx bxs-edit', styles['icon'], styles['icon--green']].join(' ')}></i> Edit
                        </span>
                  )
            }
            if (options.icons?.inOffer) {
                  headingIcons.push(
                        <span key="inOffer">
                              <i className={['bx bxs-circle', styles['icon'], styles['icon--green']].join(' ')}></i> Available in store
                        </span>
                  )
            }
            if (options.icons?.inStock) {
                  headingIcons.push(
                        <span key="inStock">
                              <i className={['bx bxs-box', styles['icon'], styles['icon--green']].join(' ')}></i> In stock
                        </span>
                  )
            }

            return headingIcons.length ? headingIcons : null;
      }

      return (
            <div className={styles['table-container']}>
                  <div className={styles['table__heading-icons']}>
                        {renderHeadingIcons()}
                  </div>
                  <table className={setTableClass()}>
                        <thead className={styles['table__heading']}>
                              <tr className={styles['table__heading-row']}>
                                    {renderTableHeading()}
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
      options: PropTypes.object
}

export default Table;