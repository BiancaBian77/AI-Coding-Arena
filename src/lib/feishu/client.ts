import * as lark from "@larksuiteoapi/node-sdk";

let clientInstance: lark.Client | null = null;

export function getFeishuClient(): lark.Client {
  if (clientInstance) return clientInstance;

  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error("FEISHU_APP_ID and FEISHU_APP_SECRET must be set");
  }

  clientInstance = new lark.Client({
    appId,
    appSecret,
    appType: lark.AppType.SelfBuild,
  });

  return clientInstance;
}
