import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'reactstrap';

import ReactTable from "react-table";
import "react-table/react-table.css";

class ListAssignedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.Auth = new AuthService()
    this.makeData = this.makeData.bind(this);
  }

  makeData() {
    axios.post('http://localhost:8080/api/assignedComponent/list', {

    }).then((response) => {
      this.setState({
        data: response.data.data
      })
      console.log('Getting api data', this.state.data)
    })

      .catch(function (error) {
        console.log(error);
      })
  }
  componentWillMount() {
    this.makeData();
  }
  render() {
    return (
      <>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Assigned Component Details",
              columns: [
                {
                  Header: "User Id",
                  accessor: "userId"
                },
                {
                  Header: "Category Id",
                  accessor: "categoryId"
                },
                {
                  Header: "Component Id",
                  accessor: "componentId"
                },
                {
                  Header: "Assigned By",
                  accessor: "assignedBy"
                },
                {
                  Header: 'Operation',
                  Cell: row => (
                    <>
                      {
                        <Link to={`/admin/adminhome/assignrequestedcomponent/${row.original.id}`} >
                          <Button>
                            <i className='fas'>&#xf044;</i>
                          </Button>
                        </Link>
                      }
                      {<Button>
                        <i className='fas'>&#xf1f8;</i>
                      </Button>}
                    </>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </>
    )
  }
}
export default ListAssignedComponent;
