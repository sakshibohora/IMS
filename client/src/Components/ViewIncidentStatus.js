import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AuthService from './AuthService';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ViewIncidentStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.Auth = new AuthService();
    this.makeData = this.makeData.bind(this);
    this.incidentUpdates = this.incidentUpdates.bind(this)
  }
  incidentUpdates() {
    const id = this.props.user.id;
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidentUpdates/details/` + id, {

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
  makeData() {
    const id = this.props.user.id;
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/list/` + id, {

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
              columns: [
                {
                  Header: "Incident Name",
                  accessor: "incidentName"
                },
                {
                  Header: "Incident",
                  accessor: "incident",
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor: d => d.status
                }
              ]
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </>
    )
  }
}
export default ViewIncidentStatus