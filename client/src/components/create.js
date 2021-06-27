import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeReceiver = this.onChangeReceiver.bind(this);
    this.onChangeCC = this.onChangeCC.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeMbody = this.onChangeMbody.bind(this);
    this.onChangeschedules = this.onChangeschedules.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        toreceiver: "",
        cc: "",
        subject: "",
        mbody: "",
        schedules: "",

    };
  }

  // These methods will update the state properties.
  onChangeReceiver(e) {
    this.setState({
        toreceiver: e.target.value,
    });
  }

  onChangeCC(e) {
    this.setState({
        cc: e.target.value,
    });
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value,
    });
  }

  onChangeMbody(e) {
    this.setState({
      mbody: e.target.value,
    });
  }

  onChangeschedules(e) {
    this.setState({
      schedules: e.target.value,
    });
  }



// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newmail) to the database.
    const newmail = {
        toreceiver: this.state.toreceiver,
        cc: this.state.cc,
        subject: this.state.subject,
        mbody:this.state.mbody,
        schedules:this.state.schedules,
    };

    axios
      .post("http://localhost:3000/record/add", newmail)
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
        toreceiver: "",
        cc: "",
        subject: "",
        mbody: "",
        schedules: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Mail</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>To: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.toreceiver}
              onChange={this.onChangeReceiver}
            />
          </div>
          <div className="form-group">
            <label>cc: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.cc}
              onChange={this.onChangeCC}
            />
          </div>
          <div className="form-group">
            <label>Subject: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.subject}
              onChange={this.onChangeSubject}
            />
          </div>
          <div className="form-group">
            <label>Body: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.mbody}
              onChange={this.onChangeMbody}
            />
          </div>
          <label>Scheduler:</label>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Scheduler"
                id="priorityHigh"
                value="Recurring schedule"
                checked={this.state.schedules === "Recurring schedule"}
                onChange={this.onChangeschedules}
              />
              <label className="form-check-label">Recurring schedule</label>
            </div>
          </div> 

          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Scheduler"
                id="priorityHigh"
                value="Weekly schedule"
                checked={this.state.schedules === "Weekly schedule"}
                onChange={this.onChangeschedules}
              />
              <label className="form-check-label">Weekly schedule</label>
            </div>
          </div> 

          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Scheduler"
                id="priorityHigh"
                value="Monthly schedule"
                checked={this.state.schedules === "Monthly schedule"}
                onChange={this.onChangeschedules}
              />
              <label className="form-check-label">Monthly schedule</label>
            </div>
          </div> 

          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="Scheduler"
                id="priorityHigh"
                value="Yearly schedule"
                checked={this.state.schedules === "Yearly schedule"}
                onChange={this.onChangeschedules}
              />
              <label className="form-check-label">Yearly schedule</label>
            </div>
          </div> 
          <div className="form-group">
            <input
              type="submit"
              value="Create mail"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}