import React, { Component } from 'react'
// import _ from "lodash";
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthService from './AuthService';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class ListCategory extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    this.makeData = this.makeData.bind(this);
    this.deleteData = this.deleteData.bind(this)

  }
  deleteData(id) {
    console.log(id)
    axios.delete('http://localhost:8080/api/categories/delete/' + id)
      .then(() => {
        if (this.props.data.length === 1) {
          this.getData();
        } else {

          axios.post('http://localhost:8080/api/categories/list')
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
    axios.post('http://localhost:8080/api/categories/list')
      .then((response) => {
        this.props.updateData(response.data)
      }).catch((error) => {
        console.log(error);
      })
  }
  componentDidMount() {
    this.makeData()
  }

  render() {
    { console.log(this.props) }

    return (
      <>
        <ReactTable
          data={this.props.data.data}
          columns={[
            {
              columns: [
                {
                  Header: "Category Name",
                  accessor: "categoryType"
                },
              ]
            },
            {
              Header: 'Operation',
              Cell: row => (
                <>
                  <Link to='/admin/adminhome/a2/addcategory'>
                    <button onClick={() => { this.props.editData(row.original) }}>
                      <i style={{ fontSize: 'font-size:24px' }} className='fas'>&#xf044;</i>
                    </button>
                  </Link>
                  {<button onClick={() => { this.deleteData(row.original.id) }}>
                    <i style={{ fontSize: 'font-size:24px' }} className='fas'>&#xf1f8;</i>
                  </button>}
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
export default ListCategory


