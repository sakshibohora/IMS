import React, { Component } from 'react'
import axios from 'axios'
import AuthService from './AuthService';
class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.insertData = this.insertData.bind(this)
  }

  insertData(e) {
    e.preventDefault();

    if (this.props.flag === true) {
      axios.put('http://localhost:8080/api/categories/edit/' + this.props.id, this.props.formData)
        .then((res) => {
          // console.log(res)
          this.props.updateState()
          this.props.history.push('/admin/adminhome/a2/listcategory');
        }).catch((err) => {
          console.log(err)
        })
    } else {
      axios.post('http://localhost:8080/api/categories', this.props.formData)
        .then((res) => {
          // console.log(res)
          this.props.updateformData()
          this.props.history.push('/admin/adminhome/a2/listcategory');
        }).catch((err) => {
          console.log(err)
        })
    }
  }
  render() {
    return (
      <>
        <form className="add add-category" onSubmit={(e) => { this.insertData(e) }}>
          <div className="row">
            {/* <div className="col-3" style={{ margin: "10px" }}></div> */}
            {/* <div className="col-4" style={{ margin: "10px" }}> */}
              <div className="form-group">
                <label htmlFor="categoryname">Category Name</label>
                <input type="text" className="form-control" placeholder="Enter category name"
                  value={this.props.formData.categoryType}
                  onChange={(e) => { this.props.handleChange(e, 'formData', 'categoryType') }} />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ margin: "10px" }}>Submit</button>
            </div>
          {/* </div> */}
        </form>
      </>
    )
  }
}
export default AddCategory