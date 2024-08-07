import { JustPay } from './../../typechain-types/contracts/JustPay';
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JustPayModule = buildModule("JustPay", (m) => {
    const justPay = m.contract("JustPay", []);
    
    return { justPay };
});

export default JustPayModule;
