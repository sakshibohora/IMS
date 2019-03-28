import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import AssignComponent from './AssignComponent';
import ManageUser from './ManageUser';

class User extends Component {
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
    const header = this.Auth.getToken();
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/list`, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      this.setState({
        data: response.data
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
    axios.delete(`${process.env.REACT_APP_SERVER}/api/users/delete/` + rowId, {
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

  //Add Modal
  renderAddUserModal() {
    return (
      <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
        <ModalHeader toggle={this.toggleAdd}>Add New User</ModalHeader>
        <ModalBody>
          <ManageUser {...this.props} makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  //Edit Modal
  renderEditUserModal() {
    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
        <ModalHeader toggle={(e) => { this.toggleEdit(e) }}>Edit User Details</ModalHeader>
        <ModalBody>
          <ManageUser id={this.state.id} {...this.props} makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e) => { this.toggleEdit(e) }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  //Assign Modal
  renderAssignComponentModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.togglemodal} className={this.props.className}>
        <ModalHeader toggle={(e) => { this.togglemodal(e) }}>Assign Component</ModalHeader>
        <ModalBody>
          <AssignComponent id={this.state.id} {...this.props} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e) => { this.togglemodal(e) }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
  render() {
    return (
      <>
        <Button type="submit" style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={this.toggleAdd}>Add New User</Button>&nbsp;
        <ReactTable
          data={this.state.data}
          columns={[
            {
              columns: [
                {
                  Header: "Username",
                  accessor: "username"
                },
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  accessor: "lastName"
                },
                {
                  Header: "Email",
                  accessor: "email"
                },
                {
                  Header: "Role",
                  id: "role",
                  accessor: d => String(d.role)
                },
                {
                  Header: "Contact No",
                  accessor: "contactNo"
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor: d => String(d.status)
                }
              ]
            },
            {
              Header: 'Operation',
              Cell:
                row => (
                  <>
                    {<Button style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className='fas'>&#xf044;</i>&nbsp;</Button>}
                    {<Button style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i>&nbsp;</Button>}
                    {<Button style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={(e) => { this.togglemodal(row.original.id) }}><i className='fas'>&#xf0fe;</i>&nbsp;</Button>}
                  </>
                )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        {this.renderEditUserModal()}
        {this.renderAddUserModal()}
        {this.renderAssignComponentModal()}
      </>
    )
  }
}
export default User