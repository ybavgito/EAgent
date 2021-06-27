import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.toreceiver}</td>
    <td>{props.record.cc}</td>
    <td>{props.record.subject}</td>
    <td>{props.record.schedule}</td>
    <td>
      <Link to={"/edit/" + props.record.mid}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record.mid);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { maildata: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:3000/record/")
      .then((response) => {
        this.setState({ maildata: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("http://localhost:3000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.maildata.filter((el) => el.mid !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.maildata.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord.mid}
        />
      );
    });
  }

  // This following section will display the table with the maildata of individuals.
  render() {
    return (
      <div>
        <h3>History</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>To:</th>
              <th>cc</th>
              <th>Subject</th>

              <th>Schedule</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}


