import React from "react";
import { useState , useEffect } from "react";

const Users = () => {
    const [users , setUsers] = useState([]);
    // sort by id useState 
    const [searchId , setSearchId] = useState('');
    // sort by Name useState
    const [searchName , setsearchName] = useState('');

    const [sortField , setSortField] = useState('');

    const [sortOrder , setSortOrder] = useState('');

    //sorting functionality

    // https://reqres.in/api/users

    useEffect(()=> {
        fetch('https://reqres.in/api/users')
          .then(res => res.json())
          .then(data => setUsers(data.data))
          .catch(err => console.log(err));
    } , []);

    // console.log(users)

    const handleSort = field => {
        if(field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }else {
            setSortField(field);
            setSortOrder('asc')
        }
    };

    const filteredUsers = users.filter(user => {
        return (
            user.id.toString().includes(searchId) && 
            (
                user.first_name.toLowerCase().includes(searchName.toLowerCase()) ||
                user.first_name.toLowerCase().includes(searchName.toLowerCase())
            )
        );
    })

    const sortedUsers = filteredUsers.sort((a , b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if(sortOrder === 'asc'){
            if(fieldA < fieldB) return -1;
            if(fieldA > fieldB) return 1;
        }
        else if (sortOrder === 'desc'){
            if(fieldA > fieldB ) return -1;
            if(fieldA < fieldB ) return 1;
        }
        return 0;
    })


    return (
        <div style={{
            display : "flex",
            justifyContent : 'center',
            alignItems : 'center'
        }}>
            <table border="2">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th onClick={() => handleSort('id')}
                        >
                           Id  {
                              sortField === 'id' && 
                               <span>{
                                  sortOrder === 'asc' ? '<' : '>'
                                }</span>
                           }
                        </th>
                        <th>First Name</th>
                        <th>last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map( user => (
                            <tr key={user.id}>
                                <td>
                                    <img src={user.avatar} alt="av" width="50" />
                                </td>
                                <td >
                                    {user.id}
                                </td>
                                <td>
                                    {user.first_name}
                                </td>
                                <td>
                                    {user.last_name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users;