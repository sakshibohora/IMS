import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
import withAuth from './withAuth';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import ReactTable from "react-table";
import "react-table/react-table.css";
import ManageIncidents from './ManageIncidents';

class Incidents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseAdd: false,
      collapseEdit: false,
      modalAdd: false,
      modalEdit: false,
      modal: false,
      id: null
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

  makeData() {
    axios.get(`${process.env.REACT_APP_SERVER}/api/incidents/list`, {

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
  renderEditCategoryModal() {
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
                  accessor: "incidentBy"
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
                  accessor: "resolvedBy"
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
                      {<Button onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className='fas'>&#xf044;</i>&nbsp;</Button>}
                    </>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        {this.renderEditCategoryModal()}
        {/* {this.renderAddCategoryModal()} */}
        {/* {this.renderAssignComponentModal()} */}
      </>

    )
  }
}
export default Incidents;
