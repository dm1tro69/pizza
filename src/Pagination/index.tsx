import React, { FC } from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationType = {
  onPageChange: (e: number) => void;
};

const Pagination: FC<PaginationType> = ({ onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel={'...'}
      nextLabel={'>'}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel={'<'}
      // @ts-ignore
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
