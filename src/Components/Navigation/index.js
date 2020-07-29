import React from 'react';
import styles from './navigation.module.scss';

export default class extends React.Component {
    changeDataType = e => {
        console.log(e);
    }

    render() {
        return(
            <nav className={styles.nav + " container"}>
                <div className={styles.nav__data}>
                    <ul onClick={this.changeDataType}>
                        <li><button className={`btn btn-outline-primary ${this.props.dataType ? 'active': ''}`}>Маленький</button></li>
                        <li><button className={`btn btn-outline-primary ${this.props.dataType ? '': 'active'}`}>Большой</button></li>
                    </ul>
                </div>
                <div className={styles.nav__filter}>
                    <label htmlFor="filter">Поиск записи </label> 
                    <input id="filter" type="text"/>
                </div>
                <div className={styles.nav__add}>
                    <button className="btn btn-outline-primary">Добавить</button>
                </div>
            </nav>
        );
    }
}