import { LibPayment } from "../typechain-types/contracts/JustPay/IJustPay";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { JustPay } from "../typechain-types/contracts/JustPay/JustPay";
import { TypedDataField, TypedDataDomain, randomBytes } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const types: Record<string, TypedDataField[]> = {
    Payment: [
        { name: "paymentId", type: "uint256" },
        { name: "sender", type: "address" },
        { name: "receiver", type: "address" },
        { name: "token", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "executor", type: "address" },
        { name: "feeToken", type: "address" },
        { name: "feeAmount", type: "uint256" },
        { name: "chainId", type: "uint256" },
        { name: "deadline", type: "uint256" },
        { name: "salt", type: "uint256" },
    ],
};

describe("JustPay", function () {
    let justPay: JustPay;
    beforeEach(async function () {
        const JustPay = await hre.ethers.getContractFactory("JustPay");
        justPay = await JustPay.deploy();
        await justPay.waitForDeployment();
    });
    async function deployTokenFixture(signer: HardhatEthersSigner) {
        const Token = await hre.ethers.getContractFactory("MockERC20");
        const token = await Token.connect(signer).deploy("Test Token", "TST");
        await token.waitForDeployment();
        return token;
    }
    it("Should execute payment", async function () {
        const signer = await hre.ethers
            .getSigners()
            .then((signers) => signers[0]);
        const recevier = await hre.ethers
            .getSigners()
            .then((signers) => signers[1]);

        const chainId = await hre.ethers.provider
            .getNetwork()
            .then((network) => network.chainId);

            
        const justPayAddress = await justPay.getAddress();

        const token = await deployTokenFixture(signer);
        await token.connect(signer).approve(justPayAddress, 100);
        const tokenAddress = await token.getAddress();

        const domainData = domain(chainId, justPayAddress);
        const salt = randomBytes(32); //! deprecated salt changed to uint256
        const payment = {
            paymentId: 1,
            sender: signer.address,
            receiver: recevier.address,
            token: tokenAddress,
            amount: 100,
            executor: "0x0000000000000000000000000000000000000000",
            feeToken: "0x0000000000000000000000000000000000000000",
            feeAmount: 0,
            chainId: chainId,
            deadline: Date.now() + 1000,
            salt: salt,
        };
        const signature = await signer.signTypedData(
            domainData,
            types,
            payment
        );
        const paymentStruct: LibPayment.PaymentStruct = {
            paymentId: payment.paymentId,
            sender: payment.sender,
            receiver: payment.receiver,
            token: payment.token,
            amount: payment.amount,
            executor: payment.executor,
            feeToken: payment.feeToken,
            feeAmount: payment.feeAmount,
            chainId: payment.chainId,
            deadline: payment.deadline,
            salt: payment.salt,
        };
        await justPay
            .connect(recevier)
            .processPayment(paymentStruct, signature, recevier.address);
        const balance = await token.balanceOf(recevier.address);
        expect(balance).to.eq(100);
    });
});

function domain(chainId: bigint, verifyingContract: string) {
    const domain: TypedDataDomain = {
        name: "JustPay",
        version: "1",
        chainId: chainId.toString(),
        verifyingContract: verifyingContract,
    };
    return domain;
}
