import React from 'react';
import styles from './navigation.module.scss';

export default class extends React.PureComponent {
    changeDataType = e => {
        if (!e.target.classList.contains('active')) {
            this.props.changeDataType();
        }
    }

    render() {
        return(
            <nav className={styles.nav + " container"}>
                <div className={styles.nav__data}>
                    <ul onClick={this.changeDataType}>
                        <li>
                            <button disabled={this.props.loading} className={`btn btn-outline-primary ${this.props.dataType ? 'active': ''}`}>Маленький</button>
                        </li>
                        <li>
                            <button disabled={this.props.loading} className={`btn btn-outline-primary ${this.props.dataType ? '': 'active'}`}>Большой</button>
                        </li>
                    </ul>
                </div>
                <div className={styles.nav__filter}>
                    <label htmlFor="filter">Поиск записи </label> 
                    <input disabled={this.props.loading} id="filter" type="text"/>
                </div>
                <div className={styles.nav__add}>
                    <button disabled={this.props.loading} className="btn btn-outline-primary">Добавить</button>
                </div>
            </nav>
        );
    }
}