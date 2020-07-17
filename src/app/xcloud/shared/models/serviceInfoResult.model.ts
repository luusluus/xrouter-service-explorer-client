import { NodeInfo } from "../../../snode/shared/models/nodeInfo.model";
import { ServiceInfo } from "./serviceInfo.model";

export class ServiceInfoResult{
    service:ServiceInfo;
    node:NodeInfo;
    otherNodes:NodeInfo[];
}