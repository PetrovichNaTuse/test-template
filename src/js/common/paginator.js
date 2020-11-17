import React from 'react';
import {fetch} from 'api';

export default class Paginator extends React.PureComponent {
    constructor(props){
        super();
        this.state = {
            loaded: false,
            totalCount: '',
            totalPages: '',
            page: props.page || 1,
            pageToShow: props.pageToShow || 5
        }
    }

    static get defaultProps(){
        return {
            api: '',
            emitter: '',
            perPage: 10,
            keyPrefix: '',
            page: 1,
        }
    }

    componentDidMount(){
        this.emitter = this.props.emitter;
        $.when(this.loadData(1)).then((data, jqxhr, xhr)=>{
            const totalCount = parseInt(xhr.getResponseHeader('X-Pagination-Total-Count'));
            const totalPages = this.calculateTotalPages(totalCount);
            this.setState({
                loaded: true,
                totalCount: totalCount,
                totalPages: totalPages
            })
        })
    }

    calculateTotalPages(totalItems){
        return Math.ceil(totalItems / this.props.perPage);
    }

    loadData(page){
        if (this.xhr) this.xhr.abort();
        this.emitter.emit('loading');
        return this.xhr = fetch(this.props.api, {
            'per-page': this.props.perPage,
            page: page
        }).done(data=>{
            this.xhr = '';
            this.emitter.emit('loaded', data)
        })
    }

    onClick(e){
        e.preventDefault();
        let page = e.target.getAttribute('href');

        if (page == 'prev') page = this.state.page - 1;
        if (page == 'next') page = this.state.page + 1;

        this.loadData(page);
        this.setState({
            page: parseInt(page)
        })
    }

    getIndexForRowPages() {

        return [leftIndex, rightIndex];
    }

    getPage(i, key) {
        return !key
            ? (
                <li key={`${this.props.keyPrefix}-${i}`} className={`page-item ${this.state.page == i ? 'active' : ''}`}>
                    <a
                        className={`page-link`}
                        href={i}
                        onClick={(e)=>this.onClick(e)}
                    >{i}</a>
                </li>
            )
            : (
                <li key={`${key}-${i}`} className={`page-item`}>
                    <span className={`page-link`}>{i}</span>
                </li>
            );
    }

    getIndexForRowPages() {
        const { page, totalCount } = this.state;
        const { pageToShow } = this.state;
        const left = page - Math.ceil(pageToShow / 2);
        const right = page + Math.floor(pageToShow / 2);
        const leftIndex = right > totalCount ? left - (right - totalCount) : Math.max(0, left);
        const rightIndex = left < 0 ? right + Math.abs(left) : Math.min(totalCount, right);

        return [leftIndex, rightIndex];
    }

    get pages() {
        const { page, totalPages, pageToShow, totalCount: count } = this.state;
        const left = Math.ceil(pageToShow / 2);
        const right = Math.floor(pageToShow / 2);
        const pages = Array(totalPages).fill().map((item, i) => this.getPage(i + 1));
        const showPages = pageToShow >= totalPages ? pages.slice(0) : pages.slice(...this.getIndexForRowPages());
        const leftPages = pageToShow >= totalPages || page - left <= 0
            ? showPages.slice(0, left)
            : [...pages.slice(0, 1), this.getPage('...', 'left'), ...showPages.slice(2, left)];
        const rightPages = pageToShow >= totalPages || page + right >= count
            ? showPages.slice(left)
            : [...showPages.slice(left, -2), this.getPage('...', 'right'), ...pages.slice(-1)];

        return [...leftPages, ...rightPages];
    }

    render(){
        const state = this.state;
        if (!state.loaded) return null;

        return (
            <ul className="pagination">
                <li className={`page-item prev ${state.page == 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="prev" onClick={(e)=>this.onClick(e)}>«</a>
                </li>
                    {this.pages}
                <li className={`page-item next ${state.page == state.totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" href="next" onClick={(e)=>this.onClick(e)}>»</a>
                </li>
            </ul>
        )
    }
}
