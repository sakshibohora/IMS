import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import ManageRequestedComponent from './ManageRequestedComponent';

class AssignRequestedComponent extends Component {
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
    axios.get(`${process.env.REACT_APP_SERVER}/api/requestComponents/getRequestComponentDetails`, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      this.setState({
        data: response.data.data
      })
      console.log(this.state.data)
    }).catch(function (error) {
      console.log(error);
    })
  }

  componentWillMount() {
    this.makeData();
  }

  handleDelete(rowId) {
    const header = this.Auth.getToken();
    axios.delete(`${process.env.REACT_APP_SERVER}/api/requestComponents/delete` + rowId, {
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
  renderAddCategoryModal() {
    return (
      <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
        <ModalHeader toggle={this.toggleAdd}>Add New Category</ModalHeader>
        <ModalBody>
          <ManageRequestedComponent {...this.props} makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  //Edit Modal
  renderEditCategoryModal() {
    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
        <ModalHeader toggle={(e) => { this.toggleEdit(e) }}>Assign Component</ModalHeader>
        <ModalBody>
          <ManageRequestedComponent id={this.state.id} {...this.props} makeData={this.makeData} toggleEdit={this.toggleEdit} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={(e) => { this.toggleEdit(e) }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    return (
      <>
        <ReactTable
          data={this.state.data}
          columns={[
            {
              Header: "Request Component Details",
              columns: [
                {
                  Header: "User Name",
                  Cell: row => <span >{row.original.User.username}</span>
                },
                {
                  Header: "Category Type",
                   Cell: row => <span >{row.original.Category.categoryType}</span>
                },
                {
                  Header: "Component Id",
                  accessor: "componentId"
                },
                {
                  Header: "Component  Name",
                  accessor: "componentName"
                },
                {
                  Header: 'Issue',
                  accessor: "issue"
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
                      {<Button style={{ color: "#EBEEF4", backgroundColor: "#343a40" }} onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i>&nbsp;</Button>}
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
      </>
    )
  }
}
export default AssignRequestedComponent