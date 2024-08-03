// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {LibPayment} from "./LibPayment.sol";
import {PaymentVerifier} from "./PaymentVerifier.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract JustPay is PaymentVerifier, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    constructor() PaymentVerifier("JustPay", "1") {}

    event PaymentProcessed(LibPayment.Payment payment);
    event PaymentCanceled(LibPayment.Payment payment);

    function processPayment(LibPayment.Payment memory _payment, bytes memory _signature, address _feeReceiver) external nonReentrant {
        _verify(_payment, _signature);
        _markProcessed(_payment);
        
        IERC20(_payment.token).safeTransferFrom(_payment.sender, _payment.receiver, _payment.amount);

        if (_payment.feeAmount > 0) {
            IERC20(_payment.feeToken).safeTransferFrom(_payment.sender, _feeReceiver, _payment.feeAmount);
        }

        emit PaymentProcessed(_payment);
    }

    function cancelPayment(LibPayment.Payment memory _payment) external nonReentrant {
        require(_payment.sender == msg.sender, "JP: caller is not the sender");
        _markCanceled(_payment);

        emit PaymentCanceled(_payment);
    }
}
