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
        paginationData: [],
        count: 50,
        flp: true,
        fln: false,
        activeLine: false,
        user: null
    };

    componentDidMount() {
        this.loadData(this.props.dataType);
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.props.dataType !== nextProps.dataType) {
            this.loadData(nextProps.dataType);
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

    render() {
        const pagination = <div className={`conteiner ${styles.pag}`}>
            <button disabled={this.state.flp} onClick={this.prev} className="btn btn-outline-info">Назад</button>
            <button disabled={this.state.fln} onClick={this.next} className="btn btn-outline-info">Вперед</button>
        </div>;

        return(
            <>
                {this.props.loading ? loadingSpinners : ''}
                {this.props.loading ? '' : <Table chooseUser={this.chooseUser} users={this.state.data}/>}
                {this.state.data.length >=50 ? pagination : ''}
                {this.state.activeLine && !this.props.loading ? <UserInfo user={this.state.user}/> : ''}
            </>
        );
    }
}