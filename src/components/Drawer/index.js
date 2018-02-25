import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'red',
  },
};

export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = newPage => {
    this.setState({open: false}, () => this.props.onClick(newPage));
  };

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={() => this.handleClose(1)}>Block Musicians</MenuItem>
          <MenuItem onClick={() => this.handleClose(2)}>Artist Page</MenuItem>
        </Drawer>
        <RaisedButton
          style={{ flex: 1 }}
          label="Open Drawer"
          onClick={this.handleToggle}
        />
      </div>
    );
  }
}
