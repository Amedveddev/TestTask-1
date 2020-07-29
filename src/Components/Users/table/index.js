import React from 'react';

export default class extends React.Component {
    hashCode(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    }

    render() {
        const users = this.props.users.map( (el,i)=>{
            return <tr key={this.hashCode(el.id+el.firstName)}>
                <th scope="row">{el.id}</th>
                <th>{el.firstName}</th>
                <th>{el.lastName}</th>
                <th>{el.email}</th>
                <th>{el.phone}</th>
            </tr>
        });

        return(
            <table className="table container-fluid">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
        );
    }
}