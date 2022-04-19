import getConfig from "next/config";

export function TransferLocalPath(lang: string, previous: string) {
    const chip = previous.slice(1).split("/")
    chip[0] = lang
    return '/' + chip.join("/")
}

export function ToLocalePath(lang: string, path: string[]) {
    const n = ['', lang, ...path]
    return n.join('/')
}

export function getCfg() {
    return getConfig()?.publicRuntimeConfig as {
        service_endpoint: string
    }

}