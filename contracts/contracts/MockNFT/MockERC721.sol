// SPDX-License-Identifier: MIT

pragma solidity 0.8.26;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IMockNFT} from "./IMockNFT.sol";

contract MockERC721 is ERC721, AccessControl, IMockNFT {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _tokenIdCounter;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function grantMinerRole(address account) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "ERC721Mock: must have admin role to grant");
        _grantRole(MINTER_ROLE, account);
    }

    function mint(address to) external {
        require(hasRole(MINTER_ROLE, msg.sender), "ERC721Mock: must have minter role to mint");
        _safeMint(to, _tokenIdCounter);
        _tokenIdCounter++;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}