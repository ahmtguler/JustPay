// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {LibPayment} from "./LibPayment.sol";


interface IJustPay {
    function processPayment(
        LibPayment.Payment memory _payment,
        bytes memory _signature,
        address _feeReceiver
    ) external;

    function cancelPayment(LibPayment.Payment memory _payment) external;
}