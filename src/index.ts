import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();
let idSeq = 0;

function logWithId(state: string) {
  console.log(`${asyncLocalStorage.getStore()} - ${state}`);
}

async function doSomeProcessing() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

export default {
  async fetch(req: Request) {
    return asyncLocalStorage.run(idSeq++, async () => {
      logWithId("start");
      await doSomeProcessing();
      logWithId("complete");
      return new Response("ok");
    });
  },
};
