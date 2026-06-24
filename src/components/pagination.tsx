import React, { Component } from "react";
 
interface PaginationProps {
    options?: {
        containerClass?: string;
        buttonIcons?: boolean;
        prevButtonClass?: string;
        prevButtonText?: string;
        prevButtonIcon?: string;
        nextButtonClass?: string;
        nextButtonText?: string;
        nextButtonIcon?: string;
        numberButtonClass?: string;
        numberClass?: string;
        numbersCountForShow?: number;
        activeClass?: string;
    };
    data?: any;
    requestParams?: any;
    changePage?: (params: any) => void;
}

interface PaginationState {
    options: {
        containerClass: string;
        buttonIcons: boolean;
        prevButtonClass: string;
        prevButtonText: string;
        prevButtonIcon: string;
        nextButtonClass: string;
        nextButtonText: string;
        nextButtonIcon: string;
        numberButtonClass: string;
        numberClass: string;
        numbersCountForShow: number;
        activeClass: string;
    };
    paginationData: any;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    currentPage: number | null;
}

class Pagination extends Component<PaginationProps, PaginationState> {
    static defaultProps = {
        options: {
            containerClass: "pagination",
            buttonIcons: false,
            prevButtonClass: "page-item",
            prevButtonText: "Prev",
            prevButtonIcon: "fa fa-chevron-left",
            nextButtonClass: "page-item",
            nextButtonText: "Next",
            nextButtonIcon: "fa fa-chevron-right",
            numberButtonClass: "page-item",
            numberClass: "page-link",
            numbersCountForShow: 2,
            activeClass: 'active'
        },
        data: {}
    };

    constructor(props: PaginationProps) {
        super(props);
        this.state = {
            options: { ...Pagination.defaultProps.options },
            paginationData: {},
            nextPageUrl: null,
            prevPageUrl: null,
            currentPage: null
        };
    }

    componentDidMount() {
        this.getProps(this.props);
    }

    UNSAFE_componentWillReceiveProps(props: PaginationProps) {
        this.getProps(props);
    }

    getProps = (props: PaginationProps) => {
        let options = { ...Pagination.defaultProps.options, ...props.options };
        this.setState({ options, paginationData: props.data });
    };

    isCurrent = (page: number) => {
        let currentPage = this.state.paginationData.meta ? this.state.paginationData.meta.current_page : this.state.paginationData.current_page;
        return currentPage === page;
    };

    handleClick = (page: number) => {
        let parameters = { ...this.props.requestParams, page };
        this.props.changePage && this.props.changePage(parameters);
    };

    generateButtonsPrev = () => {
        let options = this.state.options;
        if (options.buttonIcons) {
            return <i className={options.prevButtonIcon} />
        }
        return options.prevButtonText;
    };

    generateButtonsNext = () => {
        let options = this.state.options;
        if (options.buttonIcons) {
            return <i className={options.nextButtonIcon} />
        }
        return options.nextButtonText;
    };

    generatePagination = () => {
        let paginationData = this.state.paginationData;
        let pagination;
        if (Object.keys(paginationData).length) {
            let options = this.state.options;
            let current = paginationData.hasOwnProperty('current_page') ? paginationData.current_page : paginationData.meta.current_page,
                last = paginationData.hasOwnProperty('last_page') ? paginationData.last_page : paginationData.meta.last_page,
                delta = parseInt(options.numbersCountForShow.toString()),
                left = current - delta,
                right = current + delta + 1,
                range = [],
                rangeWithDots = [],
                l;
            for (let i = 1; i <= last; i++) {
                if ((i === 1 || i === last) || (i >= left && i < right)) {
                    range.push(i);
                }
            }
            for (let i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }

            let nextPageUrl = paginationData.hasOwnProperty('next_page_url') ? paginationData.next_page_url : paginationData.links.next;
            let prevPageUrl = paginationData.hasOwnProperty('prev_page_url') ? paginationData.prev_page_url : paginationData.links.prev;
            pagination = (
                <ul className={options.containerClass}>
                    {prevPageUrl ?
                        <li className={options.prevButtonClass} onClick={(event) => {
                            event.preventDefault();
                            this.handleClick(current - 1)
                        }}>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsPrev()}
                            </a>
                        </li> : ""}
                    {rangeWithDots.map((page, index) =>
                        this.generateNumber(page, index)
                    )}
                    {nextPageUrl ?
                        <li className={options.nextButtonClass} onClick={(event) => {
                            event.preventDefault();
                            this.handleClick(current + 1)
                        }}>
                            <a href="" className={options.numberClass}>
                                {this.generateButtonsNext()}
                            </a>
                        </li>
                        : ""}
                </ul>
            );
        }
        return pagination;
    };

    generateNumber = (page: number | string, index: number) => {
        let options = this.state.options;
        return (
            <li className={this.isCurrent(typeof page === 'number' ? page : index + 1) ? options.numberButtonClass + " " + options.activeClass :
                options.numberButtonClass} key={index}>
                <a href="" className={options.numberClass}
                   onClick={(event) => {
                       event.preventDefault();
                       this.handleClick(typeof page === 'number' ? page : index + 1)
                   }}>{page}</a>
            </li>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.generatePagination()}
            </React.Fragment>
        );
    }
}

export default Pagination;
