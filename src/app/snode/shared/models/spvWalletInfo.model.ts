import { NodeInfo } from "./nodeInfo.model";
import { SpvConfig } from "../../../xrouter/shared/models/spvConfig.model";

export class SpvWalletInfo{
    spvConfig:SpvConfig;
    node:NodeInfo;
    otherNodes:NodeInfo[];
 }