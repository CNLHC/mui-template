import { useCallback, useEffect, useState } from "react"
import { GatewaySvcClient } from "../../../sought-interface/pbfe/gateway/IndexServiceClientPb"
import { SearchReq, SearchResponse, StreamSearchResp, SubmitQueryReq, SubscribeSearchReq } from "../../../sought-interface/pbfe/gateway/index_pb"

const cli = new GatewaySvcClient("http://localhost:19500")
export const useSearch = () => {
    const [str, setStr] = useState<string | undefined>(undefined)
    const [resp, setResp] = useState<StreamSearchResp.AsObject | undefined>(undefined)
    const [sid, setSid] = useState<number | undefined>(undefined)
    const [e, setE] = useState(0)
    const search = useCallback((str: string) => {
        if (!sid) return
        if (str.trim() == "") return
        console.log("submit:", str)
        const req = new SubmitQueryReq()
        req.setSessionid(sid)
        req.setInput(str)
        return cli.submitQuery(req, null)
            .then(e => console.log("submit done:", str, e.getSubmitid()))
            .catch(e => {
                console.log(11, e)
                setE(e => e + 1)
            })
    }, [sid])

    const setAndSearch = useCallback((s: string) => {
        setStr(s)
        search(s)
    }, [search])

    useEffect(() => {
        console.log("sub search")
        const req = new SubscribeSearchReq()
        const sub = cli.subscribeSearch(req)
        sub.on('data', (resp) => {
            console.log('new search response')
            setSid(resp.getSessionid())
            if (resp.getDocument() != "") {
                setResp(resp.toObject())
            }
        })
        sub.on('error', (e) => {
            console.error(e)
        })
        return () => sub.cancel()
    }, [e])


    return { search, setStr: setAndSearch, str, resp }
}
