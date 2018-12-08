import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { Redirect } from 'react-router-dom';


const redirectPath = { login: '/login', register: '/register' }

export default class PlatformLanding extends Component {
  static displayName = 'PlatformLanding';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      redirectState: false,
    };
  }
  redirect = (redirectType) => {
    this.state.redirectState = true;
    this.state.redirectType = redirectType;
    this.setState(this.state);
  }

  render() {
    if (this.state.redirectState) {
      return <Redirect push to={this.state.redirectType} />;
    }
    return (
      <div style={styles.wrapper}>
        <div style={styles.body}>
          <h2 style={styles.title}>
            HELLO WORLD
          </h2>
          <div style={styles.buttons}>
            <Button style={styles.secondaryButton} type="normal" onClick={() => { this.redirect(redirectPath.register) }} >     
              join us
            </Button>
            <Button style={styles.primaryButton} type="primary"onClick={() => { this.redirect(redirectPath.login) }} >
              login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  buttons: { textAlign: 'center', marginTop: 33 },
  body: {
    position: 'absolute',
    top: '190px',
    left: '50%',
    marginLeft: '-300px',
    width: '600px',
    color: '#fff',
    maxHeight: '260px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  wrapper: {
    overflow: 'hidden',
    height: 720,
    backgroundImage: `url(${require('./images/TB1DgSmSpXXXXaJXpXXXXXXXXXX-2760-1480.jpg')})`,
    position: 'relative',
    backgroundSize: 'cover',
    backgroundColor: '#66ABFF',
    boxShadow: '0 1px 16px 0 rgba(0,0,0,0.10)',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    letterSpacing: '2px',
    lineHeight: '48px',
    textAlign: 'center',
  },
  primaryButton: {
    height: 50,
    fontSize: 16,
    padding: '0 58px',
    lineHeight: '50px',
    color: '#fff',
  },
  secondaryButton: {
    height: 50,
    fontSize: 16,
    padding: '0 58px',
    lineHeight: '50px',
    marginRight: 20,
    backgroundColor: 'transparent',
    borderColor: '#5485f7',
    color: '#5485f7',
  },
};
