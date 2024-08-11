A payment system enabling both EOAs and smart accounts to make ERC20 payments using a typedData signature, with flexible gas options and operator-executed transactions. It works seamlessly with any account type, making it adaptable for any use case, including NFT exchanges, and more.

This payment system is designed to simplify ERC20 token transactions by enabling both EOAs and smart/abstract accounts to authorize payments using typedData signatures. Users don't need specialized smart accounts to benefit from this system; it works with any type of account. Instead of waiting for transactions to be mined, an operator executes them, providing faster processing and an improved user experience.

The system allows for flexible gas fee payments, whether with any token or through a sponsor, and supports custom executors to manage how transactions are processed. This adaptability makes it suitable for implementation in any protocol.

The backend, developed in TypeScript, includes an API to store and manage payment information, an operator to execute transactions, and an indexer for tracking canceled and processed payment events. Although the indexer is developed, it's not currently running due to the project's scale; the operator manages transaction updates. The frontend, built using Vite React, includes a basic WETH transfer interface with hardcoded values for testing. The protocol is designed to be integrated into other systems rather than operating independently.

For contract verification and transaction tracking, Blockscout is used, ensuring transparency and accuracy throughout the process. The system can be implemented by any interface supporting typed data signatures, such as the Warpcast app or any wallet application, providing a versatile solution that works across various use cases.

By enabling seamless ERC20 payments for both EOAs and smart accounts, this payment system solves the challenges of transaction speed and flexibility. It eliminates the need for complex account setups, offering a secure and adaptable solution for any application requiring efficient and customizable token transfers.

Contract Addresses

Base: 0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0
https://base.blockscout.com/address/0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0?tab=contract

Metal L2: 0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0
https://explorer.metall2.com/address/0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0?tab=contract

Base Sepolia: 0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0
https://base-sepolia.blockscout.com/address/0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0?tab=contract