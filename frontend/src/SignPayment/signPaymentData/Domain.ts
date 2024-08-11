import { TypedDataDomain } from "ethers";

function getDomain(chainId: unknown) {
    const chain = chainId === undefined ? 84532 : chainId as number;
    const verifyingContract = getVerifyingContract();
    const domain: TypedDataDomain = {
        name: "JustPay",
        version: "1",
        chainId: chain,
        verifyingContract: verifyingContract,
    };
    return domain;
}

function getVerifyingContract() {
    return "0x96F6C144321d22E9D7aE9788DA2484202b8bEFF0"
}

export default getDomain;