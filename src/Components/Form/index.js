import React from 'react';

export default class extends React.Component {
    state = {
        form: {
            id: '',
            first: '',
            last: '',
            email: '',
            phone: '',
        }
    };

    get valid() {
        return Object.values(this.state.form).every(el=>el.length);
    }

    setValue = e =>{
        const form = {...this.state.form};

        form[e.target.getAttribute('aria-describedby')] = e.target.value;

        this.setState({
            form
        });
    }

    render() {
        return(
        <div className="form" onClick={this.props.closeForm}>
            <div className="container">
                <form onSubmit={this.props.addUser}>
                    <button type="button" className="close" aria-label="Close">
                        <span className="close" aria-hidden="true">&times;</span>
                    </button>
                    <div className="form-group">
                        <label htmlFor="id">Id</label>
                        <input name="id" onChange={this.setValue} value={this.state.form.id} type="number" className="form-control" id="id" aria-describedby="id"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="FirstName">First name</label>
                        <input name="first" onChange={this.setValue} value={this.state.form.first} type="text" className="form-control" id="FirstName" aria-describedby="first"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="LastName">Last name</label>
                        <input name="last" onChange={this.setValue} value={this.state.form.last} type="text" className="form-control" id="LastName" aria-describedby="last"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input name="email" onChange={this.setValue} value={this.state.form.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Phone">Phone</label>
                        <input name="phone" onChange={this.setValue} value={this.state.form.phone} type="tel" className="form-control" id="Phone" aria-describedby="phone"/>
                    </div>
                    <button disabled={!this.valid} aria-label="Submit" type="submit" className="btn btn-primary">Добавить</button>
                </form>
            </div>
        </div>
        );
    }
}