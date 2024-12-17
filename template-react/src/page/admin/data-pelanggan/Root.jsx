import { useState } from "react";
import DataPelangganIndex from "./Index";
import MasterPelangganAdd from "./Add";
import DataPelangganDetail from "./Detail";
import MasterPelangganEdit from "./Edit";

export default function MasterPelanggan() {
  const [pageMode, setPageMode] = useState("index");
  const [dataID, setDataID] = useState();

  function getPageMode() {
    console.log(pageMode);
    switch (pageMode) {
      case "index":
        console.log(handleSetPageMode, "aiudhiuwad");
        return <DataPelangganIndex onChangePage={handleSetPageMode} />;
      case "add":
        return <MasterPelangganAdd onChangePage={handleSetPageMode} />;
      case "detail": {
        return (
          <DataPelangganDetail
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
      }
      case "edit":
        return (
          <MasterPelangganEdit
            onChangePage={handleSetPageMode}
            withID={dataID}
          />
        );
    }
  }

  function handleSetPageMode(mode) {
    setPageMode(mode);
  }

  function handleSetPageMode(mode, withID) {
    setDataID(withID);
    setPageMode(mode);
  }

  return <div>{getPageMode()}</div>;
}
