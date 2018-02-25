import React, { Component } from 'react';
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import MeinBlockContract from '../build/contracts/MeinBlock.json';
import getWeb3 from './utils/getWeb3';

import RaisedButton from 'material-ui/RaisedButton';

import GridList from './components/GridList';
import Drawer from './components/Drawer';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

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


        // Initialize Artists
        return meinBlockInstance.initializeArtists(accounts[1], accounts[2], accounts[3], accounts[4], accounts[5], accounts[6], { from: accounts[0] });
      })
        .then(() => {
          // Make initial deposit!
          return meinBlockInstance.makeDeposit({from: accounts[0], gas: 300000, value: 1000000000000000000})
        });
    });
  }

  makeDonation = artistId => {
    const { instance, accounts } = this.state;

    return instance.makeDonation(accounts[artistId], { from: accounts[0] })
      .then(result => console.log('DONATION to Artist ' + artistId, result.receipt));
  };

  render() {
    return (
      <div>
        <Drawer />
        <GridList onStarTap={this.makeDonation} />
        <RaisedButton label="Press me!" onClick={this.makeDonation} />
      </div>
    );
  }
}

export default App;
