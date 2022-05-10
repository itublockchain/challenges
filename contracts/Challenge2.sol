// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Challenge2 {
    address payable public kral;
    uint256 public prize;

    constructor() payable {
        kral = payable(msg.sender);
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value > prize);
        kral.transfer(msg.value);
        kral = payable(msg.sender);
        prize = msg.value;
    }    
}