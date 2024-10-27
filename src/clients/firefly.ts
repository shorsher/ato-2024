import FireFly, { FireFlyEventBatchDelivery, FireFlyEventDelivery } from "@hyperledger/firefly-sdk"

let firefly: FireFly;

export const fireflyInit = async () => {
  firefly = new FireFly({
    host: "http://localhost:5000",
    namespace: "default",
  });

  await firefly.replaceSubscription({
    name: "default",
  })
  firefly.listen("default", (_, data) => {
    return handle(data);
  })
}

function handle(event: FireFlyEventDelivery | FireFlyEventBatchDelivery) {
  console.log("Event received:", event);
}

export const mintToken = async (amount: string, recipient: string) => {
  if (!firefly) {
    throw new Error("FireFly SDK not initialized");
  }

  try {
    const response = await firefly.mintTokens({
      amount: amount,
      to: recipient,
    });
    return response;
  } catch (err) {
    console.error("Error minting token:", err);
    throw err;
  }
}

export const invokeContractAPI = async (name: string, method: string, input: any) => {
  if (!firefly) {
    throw new Error("FireFly SDK not initialized");
  }

  try {
    const response = await firefly.invokeContractAPI(
      name,
      method,
      {
        input: input,
      },
      {
        confirm: true,
      }
    )
    return response;
  } catch (err) {
    console.error("Error invoking contract API:", err);
    throw err;
  }
}

export const queryContractAPI = async (name: string, method: string, input: any) => {
  if (!firefly) {
    throw new Error("FireFly SDK not initialized");
  }

  try {
    const response = await firefly.queryContractAPI(
      name,
      method,
      {
        input: input,
      }
    )
    return response;
  } catch (err) {
    console.error("Error invoking contract API:", err);
    throw err;
  }
}