import React from 'react';
import styles from './users.module.scss';

import {getData} from '../../Api/getData';
import {scroller} from 'react-scroll';

import Table from './table';
import UserInfo from './UserInfo';

const loadingSpinners = <div className={styles.load}>
<div className="spinner-border text-primary" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-border text-secondary" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-border text-success" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-border text-danger" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-border text-warning" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-border text-info" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-border text-light" role="status">
<span className="sr-only">Loading...</span>
</div>
<div className="spinner-border text-dark" role="status">
<span className="sr-only">Loading...</span>
</div>
</div>;

export default class extends React.Component {
    state = {
        data: [],
        searchData: null,
        paginationData: [],
        count: 50,
        flp: true,
        fln: false,
        activeLine: false,
        user: null,
        sort: 'asc'
    };

    componentDidMount() {
        this.loadData(this.props.dataType);
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.props.dataType !== nextProps.dataType) {
            this.loadData(nextProps.dataType);
        }  

        if (this.props.newUser !== nextProps.newUser) {
            this.addUser(nextProps.newUser);
        }

        if (this.props.searchText !== nextProps.searchText) {
            this.filter(nextProps.searchText)
        }
        
        return true;
    }

    get UsersMap() {
        const map = {};

        this.state.data.forEach( (pr,i)=> {
            map[pr.id.toString()] = i
        });

        return map;
    }

    loadData(type = false) {
        this.props.changeLoading(true);
        getData(type).then(res=>{
            let data = res;
            if (res.length >= 50) {
                data = res.slice(0, 50);
            }
            this.setState({
                data,
                searchData: res,
                paginationData: res
            }, ()=>{
                this.props.changeLoading(false);
            });
        })
        .catch(err=>{
            console.log(err);
        });
    }

    prev = () =>{
        let count = this.state.count - 50;
        let flc = count - 50;
        let flp;

        if (count <= 50) {
            count = 50;
            flc = 0;
            flp = true;
        }

        const data = this.state.paginationData.slice(flc, count);

        this.setState({
            data,
            searchData: data,
            flp,
            count,
            fln: false
        });
    }

    next = () =>{
        let count = this.state.count + 50;
        let fln;

        if (count >= this.state.paginationData.length) {
            count = this.state.paginationData.length;
            fln = true;
        }

        const data = this.state.paginationData.slice(this.state.count, count);

        this.setState({
            data,
            searchData: data,
            fln,
            count,
            flp: false
        });
    }

    chooseUser = e =>{
        const id = e.target.parentElement.firstChild.innerHTML;
        const user = this.state.data[ this.UsersMap[id] ];

        this.setState({
            user,
            activeLine: true
        }, ()=>{
            scroller.scrollTo('userInfo', {
                duration: 1500,
                delay: 100,
                smooth: true
              });
        });
    }

    sort = key =>{
        const data = [...this.state.data];
        let field;
        let sort;

        switch (key) {
            case 'ID':
                field = 'id';
                break;
            case 'First name':
                field = 'firstName';
                break;
            case 'Last name':
                field = 'lastName';
                break;
            case 'Email':
                field = 'email';
                break;
            case 'Phone':
                field = 'phone';
                break;
            default:
                break;
        }

        if (this.state.sort === 'asc') {
            data.sort((a, b) => a[field] > b[field] ? 1 : -1);
            sort = 'desc';
        }
        else {
            data.sort((a, b) => a[field] < b[field] ? 1 : -1);
            sort = 'asc';
        }

        this.setState({
            data,
            sort
        });
    }

    addUser(user) {
        const data = [...this.state.data];

        data.unshift(user);

        this.setState({
            data
        }, ()=>{
            this.props.hideForm();
        });
    }

    filter(text) {
        let data = [...this.state.searchData];

        data = data.filter(el=>(el.id+' '+el.firstName+' '+el.lastName+' '+el.email+' '+el.phone).includes(text));

        this.setState({
            data
        });
    }

    render() {
        const pagination = <div className={`conteiner ${styles.pag}`}>
            <button disabled={this.state.flp} onClick={this.prev} className="btn btn-outline-info">Назад</button>
            <button disabled={this.state.fln} onClick={this.next} className="btn btn-outline-info">Вперед</button>
        </div>;

        return(
            <>
                {this.props.loading ? loadingSpinners : ''}
                {this.props.loading ? '' : 
                <Table sort={this.sort} sortType={this.state.sort} chooseUser={this.chooseUser} users={this.state.data}/>}
                {this.state.data.length >=50 ? pagination : ''}
                {this.state.activeLine && !this.props.loading ? <UserInfo user={this.state.user}/> : ''}
            </>
        );
    }
}