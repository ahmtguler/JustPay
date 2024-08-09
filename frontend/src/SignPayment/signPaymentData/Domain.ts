import { TypedDataDomain } from "ethers";

function getDomain(chainId: number) {
    const verifyingContract = getVerifyingContract(chainId);
    const domain: TypedDataDomain = {
        name: "JustPay",
        version: "1",
        chainId: chainId.toString(),
        verifyingContract: verifyingContract,
    };
    return domain;
}
function getVerifyingContract(chaindId: number) {
    if (chaindId === 31337) {
        // hardhat
        return "0x5fbdb2315678afecb367f032d93f642f64180aa3"; //todo add the address of the contract after deployment
    } else {
        throw new Error("Invalid chainId");
    }
}

export default getDomain;