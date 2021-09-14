import CDP from "chrome-remote-interface"


export async function getVersionChrome() {
    return CDP.Version()
}