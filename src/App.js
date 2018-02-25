import React, { Component } from 'react';
import MeinBlockContract from '../build/contracts/MeinBlock.json';
import getWeb3 from './utils/getWeb3';

import ArtistGridList from './components/ArtistGridList';
import Drawer from './components/Drawer';
import ProfilePage from './components/ProfilePage';

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
      drawerPage: 1,  // either 1 or 2
      starCounts: [0, 0, 0, 0, 0, 0],
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

  setStarCount = index => {
    const newStarCounts = this.state.starCounts.slice();
    newStarCounts[index] = newStarCounts[index] + 1;
    this.setState({ starCounts: newStarCounts });
  };

  makeDonation = artistId => {
    const { instance, accounts } = this.state;

    this.setStarCount(artistId - 1);

    return instance.makeDonation(accounts[artistId], { from: accounts[0] })
      .then(result => console.log('DONATION to Artist ' + artistId, result.receipt));
  };

  renderPage1 = () => (
    <ArtistGridList starCounts={this.state.starCounts} onStarTap={this.makeDonation} />
  );
  renderPage2 = () => <ProfilePage />;

  render() {
    return (
      <div style={{ backgroundColor: 'black' }}>
        <img src={require('../logo.jpg')} style={{
          position: 'absolute',
          width: 299,
          top: 35,
          right: 43,
        }} />
        <Drawer onClick={newPage => this.setState({ drawerPage: newPage })} />
        { this.state.drawerPage === 1 ? this.renderPage1() : this.renderPage2() }
      </div>
    );
  }
}

export default App;
