import { invokeContractAPI, queryContractAPI } from "../clients/firefly";

export const handleSetStorage = async (value: string) => {
  return invokeContractAPI("ato-simplestorage", "set", { x: value });
}

export const handleQueryStorage = async () => {
  return queryContractAPI("ato-simplestorage", "get", {});
}