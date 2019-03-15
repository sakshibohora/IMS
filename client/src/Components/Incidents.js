import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import withAuth from './withAuth';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'reactstrap';

import ReactTable from "react-table";
import "react-table/react-table.css";

class Incidents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.Auth = new AuthService()
    this.makeData = this.makeData.bind(this);
  }

  makeData() {
    axios.get('http://localhost:8080/api/incidents/list', {

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
              Header: "Incident Details",
              columns: [
                {
                  Header: "Incident By",
                  accessor: "incidentBy"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Issue Title",
                  accessor: "incidentName"
                },
                {
                  Header: "Issue Details",
                  accessor: "incident"
                },
                {
                  Header: "Resolved By",
                  accessor: "resolvedBy"
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor: d => d.status
                },
                {
                  Header: '',
                  Cell: row => (
                    <>
                      {
                        <Link to={`/admin/adminhome/editIncidents/${row.original.id}`} >
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
export default Incidents;
