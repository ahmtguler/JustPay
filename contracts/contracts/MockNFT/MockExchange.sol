// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {IJustPay} from "../JustPay/IJustPay.sol";
import {LibPayment} from "../JustPay/LibPayment.sol";
import {IMockNFT} from "./IMockNFT.sol";

contract MockExchange {
    IMockNFT public nft;
    IJustPay public justPay;
    
    uint256 public constant FEE = 0.001 ether;
    address public immutable WETH_ADDRESS;
    address public feeReceiver;

    constructor(address _nft, address _justPay, address _weth) {
        nft = IMockNFT(_nft);
        justPay = IJustPay(_justPay);
        WETH_ADDRESS = _weth;
        feeReceiver = msg.sender;
    }

    function buy(LibPayment.Payment memory _payment, bytes memory _signature) external {
        require(_payment.amount == FEE, "MockExchange: invalid amount");
        require(_payment.token == WETH_ADDRESS, "MockExchange: invalid token");
        justPay.processPayment(_payment, _signature, feeReceiver);
        nft.mint(_payment.sender);
    }
}