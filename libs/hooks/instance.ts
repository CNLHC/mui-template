import { useCallback } from "react";
import { InstanceServiceClient } from "../../../sought-interface/pbfe/web/InstanceServiceClientPb";
import { CreateInstanceReq, ListInstanceReq } from "../../../sought-interface/pbfe/web/instance_pb";
import { getCfg } from "../utils";

const cli = new InstanceServiceClient(getCfg().service_endpoint)
export function useInstanceSvc() {
    const create = useCallback((req: CreateInstanceReq) => {
        return cli.create(req, null)
    }, [])
    const list = useCallback(() => {
        const req = new ListInstanceReq()
        return cli.list(req, null)

    }, [])
    return { create, list }

}