// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

library LibPayment {
    bytes32 constant PAYMENT_TYPEHASH = keccak256("Payment(uint256 paymentId,address sender,address receiver,address token,uint256 amount,address executor,uint256 fee,uint256 chainId,uint256 deadline,uint256 salt)");

    struct Payment {
        uint256 paymentId;
        address sender;
        address receiver;
        address token;
        uint256 amount;
        address executor;
        uint256 fee;
        uint256 chainId;
        uint256 deadline;
        uint256 salt;
    }

    function hash(Payment memory _payment) internal pure returns (bytes32) {
        return keccak256(abi.encode(
            PAYMENT_TYPEHASH,
            _payment.paymentId,
            _payment.sender,
            _payment.receiver,
            _payment.token,
            _payment.amount,
            _payment.executor,
            _payment.fee,
            _payment.chainId,
            _payment.deadline,
            _payment.salt
        ));
    }
}
