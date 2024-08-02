// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {IERC1271} from "@openzeppelin/contracts/interfaces/IERC1271.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {LibPayment} from "./LibPayment.sol";

abstract contract PaymentVerifier is EIP712 {
    using ECDSA for bytes32;
    using LibPayment for LibPayment.Payment;

    bytes4 constant internal MAGICVALUE = 0x1626ba7e;

    mapping(bytes32 => bool) private _processedPayments;
    mapping(bytes32 => bool) private _canceledPayments;

    constructor(string memory _name, string memory _version) EIP712(_name, _version) {}

    function isProcessed(LibPayment.Payment memory _payment) public view returns (bool) {
        return _processedPayments[_payment.hash()];
    }

    function _markProcessed(LibPayment.Payment memory _payment) internal {
        require(!_processedPayments[_payment.hash()], "PaymentVerifier: payment is already processed");
        _processedPayments[_payment.hash()] = true;
    }

    function isCanceled(LibPayment.Payment memory _payment) public view returns (bool) {
        return _canceledPayments[_payment.hash()];
    }

    function _markCanceled(LibPayment.Payment memory _payment) internal {
        require(!_canceledPayments[_payment.hash()], "PaymentVerifier: payment is already canceled");
        _canceledPayments[_payment.hash()] = true;
    }

    function verify(LibPayment.Payment memory _payment, bytes memory _signature) internal view {
        require(!isCanceled(_payment), "PaymentVerifier: payment is canceled");
        bytes32 hash = _payment.hash();
        address signer = _payment.sender;
        if (_isContract(signer)) {
            require(
                IERC1271(signer).isValidSignature(
                    _hashTypedDataV4(hash),
                    _signature
                ) == MAGICVALUE,
                "PaymentVerifier: ERC1271 ticket signature verification error"
            );
        } else {
            if (_hashTypedDataV4(hash).recover(_signature) != signer) {
                revert("PaymentVerifier: ECDSA ticket signature verification error");
            } else {
                require(signer != address(0), "PaymentVerifier: Invalid owner");
            }
        }
    }

    function _isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
