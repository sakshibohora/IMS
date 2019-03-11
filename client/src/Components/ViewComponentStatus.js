import React, { Component } from 'react'
// import _ from "lodash";
import withAuth from './withAuth';
import axios from 'axios'
import AuthService from './AuthService';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class ViewStatus extends Component {
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
    axios.post('http://localhost:8080/api/requestComponents/requestComponentByUser', data, {

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
                  Header: "Component Name",
                  accessor: "componentName"
                }
              ]
            },
            {
                columns: [
                {
                  Header: "issue",
                  accessor: "issue"
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        {/* <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" onChange={(e) => this.setSearchTerm(e.target.value)}  />
          <Link to={`/insert/`}><Button color="primary">Insert!</Button></Link>
        </nav> */}

        {/* <div>
          <table className="table table-bordered table-dark">
            <thead>
              <tr>                
                <th>categoryId</th>
                <th>Component Name</th>
                <th>Issue</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.arr.map(data =>
                <tr key={data.id}>                  
                  <td>{data.categoryId} </td>
                  <td>{data.componentName} </td>
                  <td>{data.issue}</td>
                  <td>{data.status}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}


      </>
    )
  }
}
export default withAuth(ViewStatus)