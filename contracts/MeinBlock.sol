pragma solidity ^0.4.19;

contract MeinBlock {
  uint public payoutThreshold = 4;
  mapping(address => uint256) public balanceOfDonators;
  mapping(address => uint256) public balanceOfArtists;
  /**
   * Event Description
   */
  event MakeDonation(
    address _artistAddress
  );
  event InitializedArtists(
    address _artist1,
    address _artist2,
    address _artist3,
    address _artist4,
    address _artist5,
    address _artist6
  );
  event Deposit(
    address _receiver,
    uint _amount,
    uint _balanceOfDonator
  );
  event Payout(
    address _artist,
    uint _amount
  );
  /**
   * This function initializes three artists
   */
  function initializeArtists(address artist1, address artist2, address artist3, address artist4, address artist5, address artist6) public {
    balanceOfDonators[artist1] = 0;
    balanceOfDonators[artist2] = 0;
    balanceOfDonators[artist3] = 0;
    balanceOfDonators[artist4] = 0;
    balanceOfDonators[artist5] = 0;
    balanceOfDonators[artist6] = 0;
    InitializedArtists(artist1, artist2, artist3, artist4, artist5, artist6);
  }
  /**
   * Default function that is called whenever anyone sends funds to a contract
   */
  function makeDeposit() public payable {
    uint amount = msg.value;
    balanceOfDonators[msg.sender] += amount;
    Deposit(msg.sender, amount, balanceOfDonators[msg.sender]);
  }
  /**
   * Increments the balance of one Artist by one and
   * decuts that from the balance of the donator
   */
  function makeDonation(address artistAddress) public {
    if (balanceOfDonators[msg.sender] < 1) {
      return;
    }
    else {
      balanceOfDonators[msg.sender] - 1;
      balanceOfArtists[artistAddress]++;
      MakeDonation(artistAddress);
    }
    checkIfPayoutReached(artistAddress);
  }
  /**
   * Check if payout threshold is reached and pay out if necessary
   */
  function checkIfPayoutReached(address artistAddress) internal {
    if (balanceOfArtists[artistAddress] >= payoutThreshold) {
      Payout(artistAddress, balanceOfArtists[artistAddress]);
      artistAddress.transfer(balanceOfArtists[artistAddress]*100000000000000000);
      balanceOfArtists[artistAddress] = 0;
    }
  }
}
