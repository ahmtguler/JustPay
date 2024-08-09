import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Token = buildModule("Token", (m) => {
    const token = m.contract("MockERC20", ["MockERC20", "MockERC20"]);
    return { token };
});

export default Token;
