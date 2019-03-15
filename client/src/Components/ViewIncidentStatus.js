import React, { Component } from 'react'
import axios from 'axios'
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
  }

  makeData() {
    const id = this.props.user.id;
    // console.log(id)
    const data = {
      userId: id,
    }
    axios.get('http://localhost:8080/api/incidents/list', data, {

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
                  Header: "Incident Title",
                  accessor: "incidentName"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Incident Description",
                  accessor: "incident"
                },
                {
                  Header: "Updates",
                  accessor: "updates"
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor: d => String(d.status)
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
export default ViewIncidentStatus