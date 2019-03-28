
import React, { Component } from 'react'
import axios from 'axios';
import AuthService from './AuthService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactTable from "react-table";
import ManageComponent from './ManageComponent';
import Simplert from 'react-simplert'

class Components extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapseAdd: false,
      collapseEdit: false,
      modalAdd: false,
      modalEdit: false,
      modal: false,
      id: null,
      collapse:false
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
    axios.get(`${process.env.REACT_APP_SERVER}/api/components/list`, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
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
    axios.delete(`${process.env.REACT_APP_SERVER}/api/components/delete` + rowId, {
      headers: {
        'Authorization': header
      },
    }).then((response) => {
      this.makeData();
      this.setState({collapse:true})
    })
      .catch(function (error) {
        console.log(error);
      })
  }

  //Add Modal
  renderAddComponentModal() {
    return (
      <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd} className={this.props.className}>
        <ModalHeader toggle={this.toggleAdd}>Add New Component</ModalHeader>
        <ModalBody>
          <ManageComponent {...this.props} makeData={this.makeData} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

  //Edit Modal
  renderEditComponentModal() {
    return (
      <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit} className={this.props.className}>
        <ModalHeader toggle={(e) => { this.toggleEdit(e) }}>Edit Component</ModalHeader>
        <ModalBody>
          <ManageComponent id={this.state.id} makeData={this.makeData} {...this.props} />
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
        <Button type="submit"  style={{color:"#EBEEF4",backgroundColor:"#343a40"}} onClick={this.toggleAdd}>Add New Component</Button>&nbsp;
        <ReactTable
          data={this.state.data}
          columns={[
            {
              columns: [
                {
                  Header: "Category Id",
                  accessor: "categoryId"
                },
                {
                  Header: "Component Name",
                  accessor: "componentName"
                },
                {
                  Header: "Serial No.",
                  accessor: "serialNo"
                },
                {
                  Header: "Warranty Date",
                  accessor: "warrantyDate"
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor: d => String(d.status)
                }
              ]
            },
            {
              Header: '',
              Cell: row => (
                <>
                  {<Button style={{color:"#EBEEF4",backgroundColor:"#343a40"}} onClick={(e) => { this.toggleEdit(row.original.id) }} ><i className='fas'>&#xf044;</i>&nbsp;</Button>}
                  {<Button style={{color:"#EBEEF4",backgroundColor:"#343a40"}} onClick={(e) => { this.handleDelete(row.original.id) }}><i className='fas'>&#xf1f8;</i>&nbsp;</Button>}
                </>
              )
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        {this.renderEditComponentModal()}
        {this.renderAddComponentModal()}
        <Simplert
          showSimplert={this.state.collapse}
          type={"error"}
          title={"alert"}
          message={'Record Deleted Successfully'}
        />
      </>
    )
  }
}
export default Components