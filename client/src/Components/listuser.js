import React, { Component } from 'react'
// import _ from "lodash";
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthService from './AuthService';
import '../assets/css/reactTable.css'
// Import React Table
import ReactTable from "react-table";
class ListUser extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    this.makeData = this.makeData.bind(this);
    this.deleteData = this.deleteData.bind(this)

  }
  deleteData(id) {
    console.log(id)
    axios.delete(`${process.env.REACT_APP_SERVER}/api/users/delete/` + id)
      .then(() => {
        console.log(this.props.data.length)
        if (this.props.data.length === 1) {
          this.getData();
          this.setState({ skip: 0 })
        } else {

          axios.get(`${process.env.REACT_APP_SERVER}/api/users/list`)
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
    b// console.log('request is going')
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/list`)
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
                  id: "role",
                  accessor: d => String(d.role)
                },
                {
                  Header: "Contact No",
                  accessor: "contactNo"
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor: d => String(d.status)
                }
              ]
            },
            {
              Header: '',
              Cell:
                row => (
                  <>
                    <Link to='/admin/adminhome/a0/adduser'>
                      <button onClick={() => { this.props.editData(row.original) }}>
                        <i className='fas'>&#xf044;</i>
                      </button>
                    </Link>
                    <button onClick={() => { this.deleteData(row.original.id) }}>
                      <i className='fas'>&#xf1f8;</i>
                    </button>
                    <Link to={`/admin/adminhome/assigncomponent/${row.original.id}`}>
                      <button>
                        <i className='fas'>&#xf0fe;</i>
                      </button>
                    </Link>
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
export default ListUser


