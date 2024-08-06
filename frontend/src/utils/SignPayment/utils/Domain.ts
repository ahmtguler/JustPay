import { TypedDataDomain } from "ethers";

function domain(chainId: number) {
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
    if (chaindId === 84532) {
        // Base Sepolia
        return "0x0000000000000000000000000000000000000000"; //todo add the address of the contract after deployment
    } else {
        throw new Error("Invalid chainId");
    }
}

export default domain;