import * as React from "react";

interface IProps {
  itemsCount: number;
  defaultPage: number;
  pageItemsCount: number;
  currentPage: number;
  nextPage: (page: number) => void;
}

class PageControll extends React.Component<IProps> {
  public state = {
    pagesCount: 0,
    activePage: 1,
    pageItems: 0
  };

  public componentWillMount() {
    const { itemsCount, pageItemsCount, defaultPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageItemsCount);

    this.setState({ pagesCount, activePage: defaultPage });
  }

  public componentWillReceiveProps(nextProps: IProps) {
    const { activePage } = this.state;

    if (activePage !== nextProps.currentPage) {
      this.setState({ activePage: nextProps.currentPage });
    }
  }

  public render() {
    const { pagesCount } = this.state;

    const pageItems = this.createPageItems(pagesCount);

    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{pageItems}</ul>
        </nav>
      </div>
    );
  }

  // create pages count
  private createPageItems = (pagesCount: number) => {
    const { activePage } = this.state;
    const pageItems = [];

    for (let i = 1; i <= pagesCount; i++) {
      pageItems.push(
        <li
          className={activePage === i ? "page-item active" : "page-item"}
          key={"page-item-" + i}
        >
          <a className="page-link" href="#" onClick={() => this.buttonClick(i)}>
            {i}
          </a>
        </li>
      );
    }

    return pageItems;
  };

  // on button click
  private buttonClick = (page: number) => {
    const { currentPage } = this.props;

    if (currentPage !== page) {
      // set page
      this.props.nextPage(page);

      // set active page
      this.setState({ activePage: page });
    }
  };
}

export default PageControll;
