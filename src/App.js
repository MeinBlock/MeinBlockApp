import React, { Component } from 'react';
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import MeinBlockContract from '../build/contracts/MeinBlock.json';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      instance: null,
      accounts: [],
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      });

      // Instantiate contract once web3 provided.
      this.instantiateContract();
    })
    .catch(error => {
      console.log('Error finding web3.', error);
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    const meinBlockContract = contract(MeinBlockContract);


    meinBlockContract.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    let meinBlockInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {

      this.setState({ accounts });




      meinBlockContract.deployed().then(instance => {
        this.setState({ instance });
        meinBlockInstance = instance;

        /**
         * Set watchers
         */
        const contractAddress = meinBlockContract.at(meinBlockInstance.address);
        contractAddress.Payout((error, result) => {
          console.log("PAYOUT!!!");
          !error && console.log({ result });
        });
        contractAddress.Deposit((error, result) => {
          console.log("DEPOSIT!!!");
          console.log({ error, result });
        });
        contractAddress.MakeDonation((error, result) => {
          console.log("DONATION!!!");
          console.log({ error, result });
        });



        return meinBlockInstance.initializeArtists(accounts[1], accounts[2], accounts[3], { from: accounts[0] });
      })
        .then((result) => {
          console.log('result from initializeArtists', result);

          return meinBlockInstance.makeDeposit({from: accounts[0], gas: 300000, value: 10})
        })
        .then((result) => {
          // Update state with the result.
          console.log('result', result);
          return meinBlockInstance.makeDonation(accounts[1], { from: accounts[0] });
        });
    });
  }

  // ether is Float
  inWei = ether => this.state.web3.toWei(ether.toString(), 'ether');

  makeDonation = () => {
    const { instance, accounts } = this.state;
    console.log('Donation made!');
    return instance.makeDonation(accounts[1], { from: accounts[0] })
      .then(result => console.log(result.receipt));
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">

          <div style={{ color: 'red', fontSize: 20 }} onClick={this.makeDonation}>
            Press me!
          </div>

          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
