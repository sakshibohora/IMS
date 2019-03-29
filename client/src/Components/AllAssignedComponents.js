import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button} from 'reactstrap'
import ReactTable from "react-table";

class ManageComponents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalAdd: false,
      modalEdit: false,
      id: null
    }
    this.toggleAdd = this.toggleAdd.bind(this);
    this.makeData = this.makeData.bind(this)
    this.Auth = new AuthService();
  }

  toggleAdd() {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
    }));
  }

  toggleEdit(rowId) {
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit,
      id: rowId
    }));
  }

  makeData() {
    const header = this.Auth.getToken()
    axios.get(`${process.env.REACT_APP_SERVER}/api/assigncomponents/getAssignedComponentsData/`, {
      headers: {
        'Authorization': header,
      }
    }).then((response) => {
      console.log(response.data.data)
      this.setState({
        data: response.data.data
      })
    }).catch(function (error) {
      console.log(error);
    })
  }

  componentWillMount() {
    this.makeData();
  }


  handleDelete(rowId) {
    const header = this.Auth.getToken();
    axios.delete(`${process.env.REACT_APP_SERVER}/api/components/` + rowId, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      this.makeData();
    })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {
    return (
      <>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Info",
              columns: [
                {
                  Header: "Assigned By",
                  // accessor: "categoryType",
                  Cell: row => <span className='number'>{row.original.AssignedBy.username}</span>
                },
                {
                  Header: "Category Type",
                  accessor: "categoryType",
                  Cell: row => <span className='number'>{row.original.Category.categoryType}</span>
                },
                {
                  Header: "Component Name",
                  Cell: row => <span className='number'>{row.original.Component.componentName}</span>
                },
                {
                  Header: "status",
                  id: "status",
                  Cell: row => <span className='number'>{String(row.original.Component.status)}</span>
                },
                {
                  Header: "Warranty Date",
                  accessor: "warrantyDate",
                  Cell: row => <span className='number'>{row.original.Component.warrantyDate}</span>
                },
                // {
                //   Header: '',
                //   Cell: row => (
                //     <>
                //       {<><Button style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className='fas'>&#xf044;</i></Button>&nbsp;</>}
                //       {<Button style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i></Button>}
                //     </>
                //   )
                // }
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
export default ManageComponents;