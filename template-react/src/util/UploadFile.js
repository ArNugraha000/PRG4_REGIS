import { API_LINK } from "./Constants";

const uploadFile = async (files) => {
  if (files != null) {
    console.log(files);
    const data = new FormData();
    data.append("files", files); // files langsung ditambahkan ke FormData

    try {
      const response = await fetch(API_LINK + "Upload/UploadFile", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log("responseUpload",response);
      if (response.ok) {
        console.log("uploadFileResult : " + result);
        return result.Hasil;
      } else {
        return "ERROR";
      }
    } catch (err) {
      console.log("errorlolllll", err)
      return "ERROR";
    }
  } else return "";
};

export default uploadFile;
