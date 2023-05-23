import process from "process";
import { ServerSetupFn, Application } from "@wasp/types";

const logEnvs: ServerSetupFn = async (): Promise<void> => {
  const pro = process;
  console.log("ENV:", pro.env);
};

export default logEnvs;