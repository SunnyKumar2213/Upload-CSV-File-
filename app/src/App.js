import React from "react";
import "./style.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { headers: [], data: [], errorMessage: "" };
  }

  onChange = (e) => {
    var formData = new FormData();

    formData.append("sampleFile", e.target.files[0]);

    fetch("http://localhost:3001/api/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => {
        this.setState({ errorMessage: "Sorry, something went wrong!" });
      })
      .then((resp) => {
        if (resp && resp.response.status === 1) {
          console.log("resp: ", resp);
          this.setState({ headers: resp.Data.header[0] });
          this.setState({ data: resp.Data.data });
          if(resp.Data && resp.Data.data.length === 0){
            this.setState({ errorMessage: "No Data Found!" });
          }
        } else {
          this.setState({ errorMessage: "Sorry, something went wrong!" });
        }
      });
  };
  render() {
    return (
      <div>
        <div style={{ textAlign: "center", margin: "30px" }}>
          <label>Select file(csv)</label>
          <div>
            <input type="file" accept=".csv" onChange={this.onChange} />
          </div>
        </div>
        {this.state.errorMessage}
        <table>
          <thead>
            <tr>
              {this.state.headers.map((m, i) => (
                <th key={i}>{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((data, i) => (
              <tr key={i}>
                {this.state.headers.map((head , j) => (
                  <td key={j}>{data[head]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;
