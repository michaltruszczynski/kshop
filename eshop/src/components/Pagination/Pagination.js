import React from 'react';

import { usePagination } from '../../hooks/usePagination';
import { useWindowSize } from '../../hooks/useWindowSize';
import Button from '../Button/Button';

import styles from './Pagination.module.scss';

const Pagination = ({ totalCount, currentPage, pageSize, onPageChange }) => {

      const DOTS = "…";
      const sibilingCount = 1;

      const paginationButtonsRange = usePagination(totalCount, pageSize, sibilingCount, currentPage);
      const windowSize = useWindowSize();

      const isMobile = windowSize.width < 576;

      const totalPageCount = Math.ceil(totalCount / pageSize);
      const isLastPage = totalPageCount === currentPage;
      const isFirstPage = 1 === currentPage;

      const scrollToTop = () => {
            window.scrollTo(0, 0);
      }

      const changePage = (event, pageNumber) => {
            scrollToTop();
            onPageChange(pageNumber);
      }

      const goToNextPage = () => {
            scrollToTop();
            onPageChange(page => page + 1);
      }

      const goToPreviousPage = () => {
            scrollToTop();
            onPageChange(page => {
                  if (page <= 1) {
                        return 1;
                  }
                  return page - 1;
            });
      }

      if (currentPage === 0 || paginationButtonsRange.length < 2) {
            return null;
      }

      return (
            <div className={styles['pagination-controls']}>
                  {!isMobile ? (<ul className={styles['button-list']}>
                        <li className={styles['button-item']}>
                              <Button onClick={goToPreviousPage} disabled={isFirstPage}>Prev</Button>
                        </li>
                        {paginationButtonsRange.map(pageNumber => {
                              if (pageNumber === DOTS) {
                                    return (
                                          <li className={styles['button-item']} key={`page${pageNumber}`}>
                                                <Button
                                                      disabled={true}
                                                      onClick={(event) => changePage(event, pageNumber)}
                                                >...</Button>
                                          </li>
                                    )
                              }
                              return (
                                    <li className={styles['button-item']} key={`page${pageNumber}`}>
                                          <Button
                                                active={pageNumber === currentPage}
                                                onClick={(event) => changePage(event, pageNumber)}
                                          >{pageNumber}</Button>
                                    </li>
                              )
                        })}
                        <li className={styles['button-item']}>
                              <Button onClick={goToNextPage} disabled={isLastPage}>Next</Button>
                        </li>
                  </ul>) :
                        (<div className={styles['button-list']}>
                              <Button onClick={goToPreviousPage} disabled={isFirstPage}>Prev</Button><span className={styles['page-counter']}>Page {currentPage} of {totalPageCount} </span><Button onClick={goToNextPage} disabled={isLastPage}>Next</Button>
                        </div>)}
            </div>
      )
}

export default Pagination
