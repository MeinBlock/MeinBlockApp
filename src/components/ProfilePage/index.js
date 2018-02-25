import React from 'react';

import Paper from 'material-ui/Paper';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    justifyContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  subContainer: {
    padding: '20%',
  },
  logEntry: {
    padding: 20,
  },
  image: {
    width: 400,
  }
};

export default class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <div style={{ marginBottom: 20, fontSize: 25 }}>Danitsa</div>
          <div style={styles.imageWrapper}>
            <img style={styles.image} src={'http://gds.fm/sites/default/files/styles/adaptive_image/adaptive-image/public/field/image/a2618472284_10.jpg'} />
          </div>

        </div>
        <div style={styles.subContainer}>
          <Paper style={styles.logEntry} zDepth={2}>
            <span style={{ fontSize: 30 }}>Personal log of received donations</span>
          </Paper>
        </div>
      </div>
    );
  }
}
