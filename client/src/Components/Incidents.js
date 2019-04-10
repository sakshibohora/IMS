import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import ManageIncidents from './ManageIncidents';
import Simplert from 'react-simplert'

class Incidents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalAdd: false,
      modalEdit: false,
      modal: false,
      id: null,
    }
    this.toggleAdd = this.toggleAdd.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.togglemodal = this.togglemodal.bind(this)
    this.makeData = this.makeData.bind(this)
    this.Auth = new AuthService();
  }

  toggleAdd() {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
    }));
  }

  togglemodal(rowId) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: rowId
    }));
  }

  toggleEdit(rowId) {
    this.setState(prevState => ({
      modalEdit: !prevState.modalEdit,
      id: rowId
    }));
  }

  handleDelete(rowId) {
    const header = this.Auth.getToken();
    axios.delete(`${process.env.REACT_APP_SERVER}/api/incidents/` + rowId, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      if (this.state.showSimplert === false) this.setState({ showSimplert: !this.state.showSimplert });
      this.makeData();
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  makeData() {
    const header = this.Auth.getToken();
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/getincidentDetails`, {
      headers: {
        'Authorization': header
      },
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
  renderEditIncidentModal() {
    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
        <ModalHeader toggle={(e) => { this.toggleEdit(e) }}>Update Incident</ModalHeader>
        <ModalBody>
          <ManageIncidents id={this.state.id} {...this.props} makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e) => { this.toggleEdit(e) }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
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
                  Cell: row => <span >{row.original.User.username}</span>

                },
                {
                  Header: "Incident Id",
                  accessor: "id"
                },

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
                  Cell: row => <span className='number'>{row.original.ResolvedBy && row.original.ResolvedBy.username}</span>
                },
                {
                  Header: "Updates",
                  accessor: "updates"
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor: d => d.status
                },
                {
                  Header: 'operation',
                  Cell: row => (
                    <>
                      {<Button style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className='fas'>&#xf044;</i>&nbsp;</Button>}
                      {/* {<Button color='danger' onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i></Button>} */}
                    </>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        {this.renderEditIncidentModal()}
        <Simplert type={"error"}
          title={"Your data has been deleted!"}
          showSimplert={this.state.showSimplert}
          onClose={() => this.setState({ showSimplert: !this.state.showSimplert })}
        />

      </>

    )
  }
}
export default Incidents;




