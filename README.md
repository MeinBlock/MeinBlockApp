# MeinBlockApp

Ethereum Smart Contract based Micro-Donation Platform.

A micro-donation service for aspiring artists which utilizes the automation (without a middle-man) of the [Ethereum]() block-chain.

Created as part of the StartHack 2018 hackathon in St. Gallen. ([Please click here for an overview of the project on Devpost](https://devpost.com/software/meinblock)).

## Install

1. Clone the project from Github
2. Run `npm install` to install all the dependencies.

## Run

1. Start local ethereum blockchain with 10 addresses via truffle develop. Add `--log` to show ethereum log:

```
truffle develop --log
```

2. In a new window open the truffle console in which you then execute the `compile` and `migrate` the smart contract commands:

```
truffle develop
truffle(develop)> compile
truffle(develop)> migrate
```

3. Start the front-end development server of the dApp and visit [http://localhost:3000]() to view it (it should open up a browser windows with that url automatically):

```
npm start
```

## About this project

### Smart Contract (a.k.a chain-code)

This project contains a smart contract which specifies the flow of artist and consumer chash-flows.

* Micro-donations are only paid out to artists when a certain threshold is reached to minimize transaction costs.
* Micro-donations only cause minimal changes of the smart contract which is much cheaper than a full transaction on the public Ethereum blockchain.

### dApp

We used the [truffle framework]() to compile and migrate the smart contract and to include [web3.js]() as a means to handle user interactions with the blockchain via our smart contract.

The front-end of the dApp is written in Javascript with the [React framework](). It closely interacts with the smart contract via web3.js.

## Next steps

So far this project uses the local Ethereum which comes out of the box as part of the truffle framework. A next step would be to deploy the smart contract on the public Ethereum blockchain.

Additionally this dApp could be extended with more screens and serve as the base of a web-widget homepages of artists could integrate. 
