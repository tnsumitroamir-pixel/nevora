import { getRequestHeader, getRequestIP, type H3Event } from "h3";

const loopbackAddresses = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);
const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1"]);

export function isLocalInstallerRequest(event: H3Event) {
  const address = getRequestIP(event, { xForwardedFor: false });
  const hostHeader = getRequestHeader(event, "host")?.toLowerCase() ?? "";
  const hostname = hostHeader.startsWith("[")
    ? hostHeader.slice(1, hostHeader.indexOf("]"))
    : hostHeader.split(":")[0];

  return Boolean(address && loopbackAddresses.has(address) && loopbackHosts.has(hostname));
}
