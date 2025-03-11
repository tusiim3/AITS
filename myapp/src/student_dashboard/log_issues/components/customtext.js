import React, { Component } from "react";

class Simpletextarea extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  handleChange(event) {
    console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <label>
            <h5>Type custom complaint:</h5>
            <textarea type="textarea" 
                name="textValue"
                onChange={this.handleChange}
                rows ='12'
                columns = '5'
            />
        </label>
      </div>
    );
  }
}

export default Simpletextarea;