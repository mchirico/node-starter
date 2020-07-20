import { PORT } from "../configuration/index";
import { getApp } from "./app";
import { App, FBLog } from "@mchirico/fblog";

const databaseURL = "https://septapig.firebaseio.com";
const db = App(databaseURL).firestore();
const fbLog = new FBLog(db);

interface DOC {
  desc: string;
  timeStamp?: string;
}

fbLog.onSnapshot("fblog", "action", "activate", "added", (doc: DOC) => {
  console.log("Document added...................callback:", doc?.desc);
});

const startServer = () => {
  try {
    const app = getApp();
    app.listen(PORT, () => {
      console.log(`🚀 server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
startServer();
