import React from 'react';
import styles from './users.module.scss';

import {getData} from '../../Api/getData';

import Table from './table';

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

export default class extends React.PureComponent {
    state = {
        data: [],
        paginationData: [],
        count: 50,
        flp: true,
        fln: false
    };

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        getData(this.props.dataType).then(res=>{
            let data = res;
            if (res.length >= 50) {
                data = res.slice(0, 50);
            }
            this.setState({
                data,
                paginationData: res
            });
            this.props.changeLoading();
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

    render() {
        const pagination = <div className={`conteiner ${styles.pag}`}>
            <button disabled={this.state.flp} onClick={this.prev} className="btn btn-outline-info">Назад</button>
            <button disabled={this.state.fln} onClick={this.next} className="btn btn-outline-info">Вперед</button>
        </div>;

        return(
            <>
                {this.props.loading ? loadingSpinners : ''}
                {this.props.loading ? '' : <Table users={this.state.data}/>}
                {this.state.data.length >=50 ? pagination : ''}
            </>
        );
    }
}