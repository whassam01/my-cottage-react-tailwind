import React, { Component } from "react";

import { Pagination } from "../index";
import "./PaginationFilter.scss";

export class PaginationFilter extends Component {
  constructor(props) {
    super(props);
    const { dateRange, addCreatedAt } = this.props;

    const pagination = new Pagination();
    // Insert the first page with no cursor

    if (addCreatedAt) {
      pagination.insert(null, dateRange.end);
    } else {
      pagination.insert(null);
    }

    this.state = {
      selectedPage: 1,
      pageCount: 1,
      pagination,
    };
  }

  componentDidUpdate = (prevProps) => {
    const { isPageReset } = this.props;

    if (isPageReset && isPageReset !== prevProps.isPageReset) {
      this.resetPagination();
    }
  };

  resetPagination = () => {
    const { dateRange, addCreatedAt } = this.props;
    // Reset pagination,
    const pagination = new Pagination();
    // Insert the first page with no cursor

    if (addCreatedAt) {
      pagination.insert(null, dateRange.end);
    } else {
      pagination.insert(null);
    }

    this.setState(
      {
        selectedPage: 1,
        pagination,
      },
      () => this.props.onResetPagination(null)
    );
  };

  changeToNextPage = () => {
    const { addCreatedAt, pageInfo, edges } = this.props;
    const { selectedPage, pagination } = this.state;
    const cursor = pageInfo.endCursor;

    if (addCreatedAt) {
      const { createdAt } = edges[edges.length - 1].node;
      pagination.insert(cursor, createdAt);
    } else {
      pagination.insert(cursor);
    }

    this.setState(
      {
        selectedPage: selectedPage + 1,
        pagination,
      },
      () => this.props.onPageChange(pagination.tail.cursor, pagination.tail.date)
    );
  };

  changeToPreviousPage = () => {
    const { selectedPage, pagination } = this.state;

    pagination.pop();

    this.setState(
      {
        selectedPage: selectedPage - 1,
        pagination,
      },
      () => this.props.onPageChange(pagination.tail.cursor, pagination.tail.date)
    );
  };

  render = () => {
    const { selectedPage } = this.state;
    const { pageCount } = this.props;
    return (
      <>
        <div className="pagination-main">
          <button
            className="prev"
            disabled={selectedPage === 1}
            onClick={this.changeToPreviousPage}
          />
          <p className="pagination-total">
            <span className="pagination-subtotal">{selectedPage}</span>
            <span className="slash">/</span>
            {pageCount}
          </p>
          <button
            className="next"
            disabled={selectedPage === pageCount}
            onClick={this.changeToNextPage}
          />
        </div>
      </>
    );
  };
}
