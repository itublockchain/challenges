// SPDX-License-Identifier: UNLICENSED

pragma solidity >= 0.7.0 <0.9.0;

contract Challenge0 {

    address public owner; //
    uint private _userBalance; // setter and getter function
    uint public withdrawAmount; // setter function
    bool public canWithdraw;

    constructor() {
        owner = msg.sender; 
    }

    function setWithdrawAmount(uint _withdrawAmount) public {
        withdrawAmount = _withdrawAmount;
    }

    function setUserBalance(uint userBalance) public {
        _userBalance = userBalance;
    }

    function getUserBalance() public view returns (uint) {
        if (msg.sender == owner) {
            return _userBalance;
        } else {
            return 0;
        }
    }

    function checkWithdraw() public {
        if (_userBalance >= withdrawAmount) {
            canWithdraw = true;
        } else {
            canWithdraw = false;
        }
    }

}