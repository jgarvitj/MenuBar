import React from "react";
import { Button, Select, Typography, Input } from "antd";
import "antd/dist/antd.css";
import MenuList from "./MenuList";
// import { MenuSearch } from "./MenuList";
import menus from "./menu";

const { Option } = Select;
const { Text } = Typography;
let menusCopy = menus;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      modulesIsHidden: true,
      data: menus,
      value: null,
    };
  }

  handleChange = (event) => {
      menusCopy = menus;
    this.setState({
      value: event.target.value,
    //   data: menusCopy,
        
    });
    console.log(menusCopy.children);
  };

  openMenu = () => {
    this.setState({
      modulesIsHidden: !this.state.modulesIsHidden,
    });
  };

  render() {
    
    return (
      <div className="App">
        <Button onClick={this.openMenu}>Menu</Button>
        {!this.state.modulesIsHidden && (
          <>
            <br />
            <Text>Filter</Text>
            <Input
              placeholder="Type to search"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {/* <MenuSearch menus={(this.state.value, false, this.state.data)} /> */}
            </Input>
            <br />
            <br />
            {/* {this.state.value && <MenuSearch menus={ this.state.data } value={ this.state.value }/>} */}
            <MenuList menus={this.state.data} value={this.state.value} />
          </>
        )}
      </div>
    );
  }
}

export default App;