import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

export default class login extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeReceiver = this.onChangeReceiver.bind(this);
    this.onChangepwd = this.onChangepwd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        email: "",
        pwd: "",
    };
  }

  // These methods will update the state properties.
  onChangeReceiver(e) {
    this.setState({
        email: e.target.value,
    });
  }

  onChangepwd(e) {
    this.setState({
        pwd: e.target.value,
    });
  }




// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newmail) to the database.
    const newuser = {
        email: this.state.email,
        pwd: this.state.pwd,
    };

    axios
      .post("http://localhost:3000/", newuser)
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
        email: this.state.email,
        pwd: this.state.pwd,
        
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.toreceiver}
              onChange={this.onChangeReceiver}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.cc}
              onChange={this.onChangepwd}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}