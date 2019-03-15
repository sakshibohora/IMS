import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AuthService from './AuthService';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
class ListComponent extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    this.makeData = this.makeData.bind(this);
    this.deleteData = this.deleteData.bind(this)

  }
  deleteData(id) {
    console.log(id)
    axios.delete('http://localhost:8080/api/components/delete/' + id)
      .then(() => {
        console.log(this.props.data.length)
        if (this.props.data.length === 1) {
          this.getData();
          this.setState({ skip: 0 })
        } else {

          axios.get('http://localhost:8080/api/components/list')
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
    axios.get('http://localhost:8080/api/components/list')
      .then((response) => {
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
          data={this.props.data.data}
          columns={[
            {
              columns: [
                {
                  Header: "Category Id",
                  accessor: "categoryId"
                },
                {
                  Header: "Component Name",
                  accessor: "componentName"
                },
                {
                  Header: "Serial No.",
                  accessor: "serialNo"
                },
                {
                  Header: "Warranty Date",
                  accessor: "warrantyDate"
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
              Cell: row => (
                <>
                  <Link to='/admin/adminhome/a1/addcomponent'>
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
export default ListComponent


