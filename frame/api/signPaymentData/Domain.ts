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
    if (chaindId === 8453) {
        // base mainnet
        return "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0";
    } else if (chaindId === 84532) {
        // base testnet
        return "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0";
    } else if (chaindId === 1750) {
        // metal l2
        return "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0";
    } else {
        throw new Error("Invalid chainId");
    }
}

export default getDomain;