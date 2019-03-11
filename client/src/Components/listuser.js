import React, { Component } from 'react'
// import _ from "lodash";
import withAuth from './withAuth';
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthService from './AuthService';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class ListUser extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    this.makeData = this.makeData.bind(this);
    this.deleteData = this.deleteData.bind(this)

  }
  deleteData(id) {
    console.log(id)
    axios.delete('http://localhost:8080/api/users/delete/' + id)
      .then(() => {
        console.log(this.props.data.length)
        if (this.props.data.length === 1) {
          this.getData();
          this.setState({ skip: 0 })
        } else {

          axios.get('http://localhost:8080/api/users/list')
            .then((res) => {
              let data = res.data;
              this.props.updateData(data)
            })
            .catch(err => console.log)
        }

        console.log('deleted')

      }).catch((err) => {
        console.log(err)
      })
  }
  makeData() {
    // console.log('request is going')
    axios.get('http://localhost:8080/api/users/list')
      .then((response) => {
        // console.log("listuser", response.data)

        this.props.updateData(response.data)
      }).catch((error) => {
        console.log("error from listuser", error);
      })
  }

  componentDidMount() {
    this.makeData()
  }

  render() {

    return (
      <>
        {/* {console.log('hexa', this.props.data)} */}

        <ReactTable
          data={this.props.data}
          columns={[
            {
              columns: [
                {
                  Header: "Username",
                  accessor: "username"
                },
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  accessor: "lastName"
                },
                {
                  Header: "Email",
                  accessor: "email"
                },
                {
                  Header: "Role",
                  accessor: "role"
                },
                {
                  Header: "Contact No",
                  accessor: "contactNo"
                },
                {
                  Header: "Status",
                  accessor: 'status'.toString()
                }
              ]
            },
            {
              Header: '',
              Cell: row => (
                <>
                  <Link to='/admin/a0/adduser'><button onClick={() => { this.props.editData(row.original) }}>EDIT</button></Link>
                  {<button onClick={() => { this.deleteData(row.original.id) }}>DELETE</button>}
                </>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </>
    )
  }
}
export default withAuth(ListUser)


{/* <table>
          <thead>
            <tr>
              <th>ProductName</th>
              <th>ProductId</th>
              <th>Prize</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(element =>
              <tr key={element.id}>
                <td>{element.username}</td>
                <td>{element.password}</td>
                <td>{element.firstName}</td>
                <td>{element.lastName}</td>
                <td>{element.email}</td>
                <td>{element.contactNo}</td>
                <td>{element.role}</td>
                <td>{element.status}</td>
                <td><Link to='/admin/adduser'><button  onClick={() => { this.props.editData(element) }}>EDIT</button></Link></td>
                <td><button onClick={() => { this.deleteData(element.id) }}>DELETE</button></td>
              </tr>
            )}
          </tbody>
        </table> */}