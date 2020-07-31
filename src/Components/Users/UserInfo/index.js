import React from 'react';

export default class extends React.Component {
    render() {
        return(
            <section id="userInfo" style={{marginTop: 10, borderTop: '1px solid gray', padding: '10px 0px'}}>
                <div className="container">
                    <p>Выбран пользователь: <b>{this.props.user.firstName + ' ' + this.props.user.firstName}</b></p>
                    <p>
                        Описание:<br/>
                        <textarea readOnly defaultValue={this.props.user.description}/>
                    </p>
                    <p>Адрес проживания: <b>{this.props.user.address.streetAddress}</b></p>
                    <p>Город: <b>{this.props.user.address.city}</b></p>
                    <p>Провинция/штат: <b>{this.props.user.address.state}</b></p>
                    <p>Индекс: <b>{this.props.user.address.zip}</b></p>
                </div>
            </section>
        );
    }
}