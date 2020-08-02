import React from 'react';

export default class extends React.Component {
    hashCode(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    }

    sort = e =>{
        let elem;

        if (e.target.tagName === 'IMG') {
            elem = e.target.parentElement;
        } 
        else elem = e.target;

        this.props.sortType === 'asc' ? elem.classList.add('sort') : elem.classList.remove('sort');

        this.props.sort( elem.textContent.trim() );
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
            <table className="table table-hover container-fluid">
                <thead onClick={this.sort}>
                    <tr>
                    <th scope="col">ID <img src="/sort.svg" alt="icon"/></th>
                    <th scope="col">First name <img src="/sort.svg" alt="icon"/></th>
                    <th scope="col">Last name <img src="/sort.svg" alt="icon"/></th>
                    <th scope="col">Email <img src="/sort.svg" alt="icon"/></th>
                    <th scope="col">Phone <img src="/sort.svg" alt="icon"/></th>
                    </tr>
                </thead>
                <tbody onClick={this.props.chooseUser}>
                    {users}
                </tbody>
            </table>
        );
    }
}