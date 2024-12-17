import { useEffect, useRef, useState } from "react";
import { PAGE_SIZE, API_LINK } from "../../../util/Constants";
import SweetAlert from "../../../util/SweetAlert";
import UseFetch from "../../../util/UseFetch";
import Button from "../../../component/part/Button";
import Input from "../../../component/part/Input";
import Table from "../../../component/part/Table";
import Paging from "../../../component/part/Paging";
import Filter from "../../../component/part/Filter";
import DropDown from "../../../component/part/Dropdown";
import Alert from "../../../component/part/Alert";
import Loading from "../../../component/part/Loading";
import DataPelangganDetail from "./Detail";
import moment from "moment";
import "moment/locale/id";
import * as XLSX from "xlsx";
import CustomerEdit from "../../customer/Edit";

const inisialisasiData = [
  {
    Key: null,
    No: null,
    "Kode Pelanggan": null,
    Tanggal: null,
    "Nama Perusahaan": null,
    "Pemilik Perusahaan": null,
    Status: null,
    Count: 0,
  },
];
function getYearsList() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push({ Value: year, Text: year.toString() });
  }
  return years;
}
const dataFilterSort = [
  { Value: "[Kode Pelanggan] asc", Text: "Kode Pelanggan [↑]" },
  { Value: "[Kode Pelanggan] desc", Text: "Kode Pelanggan [↓]" },
];

const dataFilterStatus = [
  { Value: "Aktif", Text: "Aktif" },
  { Value: "Tidak Aktif", Text: "Tidak Aktif" },
];

export default function DataPelangganIndex() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentData, setCurrentData] = useState(inisialisasiData);
  const [allData, setAllData] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    page: 1,
    query: "",
    sort: "[Kode Pelanggan] asc",
    status: "Aktif",
    year: new Date().getFullYear(),
  });
  const [currentPage, setCurrentPage] = useState("index");
  const [selectedId, setSelectedId] = useState(null);

  const searchQuery = useRef();
  const searchFilterSort = useRef();
  const searchFilterStatus = useRef();
  const searchFilterYear = useRef();

  function handleSetCurrentPage(newCurrentPage) {
    setIsLoading(true);
    setCurrentFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: newCurrentPage,
      };
    });
  }

  function handleSearch() {
    setIsLoading(true);
    setCurrentFilter((prevFilter) => {
      return {
        ...prevFilter,
        page: 1,
        query: searchQuery.current.value,
        sort: searchFilterSort.current.value,
        status: searchFilterStatus.current.value,
        year: searchFilterYear.current.value,
      };
    });
  }

  function handleSetStatus(id) {
    setIsLoading(true);
    setIsError(false);

    console.log("Setting status for ID:", id);

    fetch(API_LINK + "RegisterCustomer/SetStatusRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idPelanggan: id,
      }),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);

        if (typeof data === "string" && data === "ERROR") {
          setIsError(true);
          console.error("Error in response data");
        } else if (Array.isArray(data) && data.length === 0) {
          setIsError(true);
          console.error("Error: No data in response");
        } else {
          SweetAlert(
            "Sukses",
            "Status data pelanggan berhasil diubah menjadi " + data[0].Status,
            "success"
          );
          handleSetCurrentPage(currentFilter.page);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.error("Fetch error:", error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleChangePage(action, id) {
    if (action === "detail") {
      setSelectedId(id);
      setCurrentPage("detail");
    } else if (action === "edit") {
      setSelectedId(id);
      setCurrentPage("edit");
    } else {
      setCurrentPage("index");
    }
  }

  useEffect(() => {
    if (currentPage === "index") {
      const fetchData = async () => {
        setIsError(false);

        try {
          const data = await UseFetch(
            API_LINK + "RegisterCustomer/GetDataRegister",
            currentFilter
          );

          console.log(data);

          if (data === "ERROR") {
            setIsError(true);
          } else if (data.length === 0) {
            setCurrentData(inisialisasiData);
          } else {
            const formattedData = data.map((value) => ({
              ...value,
              Tanggal: moment(value.Tanggal).locale("id").format("D MMMM YYYY"),
              Aksi: ["Toggle", "Detail", "Edit"],
              Alignment: [
                "center",
                "center",
                "left",
                "left",
                "left",
                "center",
                "center",
              ],
            }));
            setCurrentData(formattedData);
          }
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [currentFilter, currentPage]);

  const handlePrintAllData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      console.log("Fetching all data...");
      const allData = await UseFetch(
        API_LINK + "RegisterCustomer/GetAllDataRegister",
        currentFilter
      );

      console.log("All data fetched: ", allData);

      if (allData === "ERROR" || allData.length === 0) {
        console.error("Error: No data fetched or an error occurred");
        setIsError(true);
      } else {
        const formattedData = allData.map(
          ({ Key, Status, Count, ...rest }) => ({
            ...rest,
            Tanggal: moment(rest.Tanggal).format("DD MMMM YYYY", {
              locale: "id",
            }), // Format tanggal disesuaikan dengan Bahasa Indonesia
          })
        );

        console.log("ALL DATA Formatted data: ", formattedData);

        // Add titles and headers
        const mainTitle = [["Astra Polytechnic"]];
        const subTitle1 = [["Data Customer"]];
        const subTitle2 = [[""]];
        const header = [Object.keys(formattedData[0])];
        const dataWithHeader = mainTitle
          .concat(subTitle1)
          .concat(subTitle2)
          .concat(header)
          .concat(formattedData.map(Object.values));

        const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeader);

        // Merge cells for the main title row and sub-titles
        worksheet["!merges"] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: header[0].length - 1 } },
          { s: { r: 1, c: 0 }, e: { r: 1, c: header[0].length - 1 } },
          { s: { r: 2, c: 0 }, e: { r: 2, c: header[0].length - 1 } },
        ];

        // Set styles for the titles
        const setCellStyle = (cell) => {
          if (!worksheet[cell]) worksheet[cell] = {};
          worksheet[cell].s = {
            alignment: { horizontal: "center", vertical: "center" },
            font: { bold: true, sz: 14 },
          };
        };

        // Apply styles to the title cells
        setCellStyle("A1");
        setCellStyle("A2");
        setCellStyle("A3");

        // Add borders to every cell
        const range = XLSX.utils.decode_range(worksheet["!ref"]);
        for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
          for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cellAddress = XLSX.utils.encode_cell({
              r: rowNum,
              c: colNum,
            });
            if (!worksheet[cellAddress]) worksheet[cellAddress] = {};
            worksheet[cellAddress].s = {
              border: {
                top: { style: "thin", color: { auto: 1 } },
                bottom: { style: "thin", color: { auto: 1 } },
                left: { style: "thin", color: { auto: 1 } },
                right: { style: "thin", color: { auto: 1 } },
              },
            };
          }
        }

        // Adjust column widths
        const columns = Object.keys(formattedData[0]);
        const colWidths = columns.map((column) => ({
          wch: Math.max(
            ...formattedData.map((row) =>
              row[column] ? row[column].toString().length : 0
            )
          ),
        }));
        worksheet["!cols"] = colWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Customer");

        // Menyimpan file dengan nama yang mengandung tanggal unduh
        const currentDate = moment().format("DD MMMM YYYY", "id"); // Format tanggal disesuaikan dengan Bahasa Indonesia
        const fileName = `Data_Customer_${currentDate}.xlsx`;
        XLSX.writeFile(workbook, fileName);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentPage === "detail") {
    return (
      <DataPelangganDetail
        onChangePage={handleChangePage}
        withID={selectedId}
      />
    );
  }

  if (currentPage === "edit") {
    return <CustomerEdit onChangePage={handleChangePage} withID={selectedId} />;
  }

  return (
    <>
      <div className="d-flex flex-column" style={{ width: "1600px" }}>
        {/* {isError && (
          <div className="flex-fill">
            <Alert
              type="warning"
              message="Terjadi kesalahan: Gagal mengambil data pelanggan."
            />
          </div>
        )} */}
        <div className="flex-fill">
          <div className="input-group">
            {/* <Button
              iconName="print"
              classType="success"
              label="Export"
              onClick={handleExportToExcel}
            /> */}
            <Button
              iconName="print"
              classType="primary"
              label="Export Excel"
              onClick={handlePrintAllData} // Tambahkan event handler untuk cetak semua data
            />
            <Input
              ref={searchQuery}
              forInput="pencarianPelanggan"
              placeholder="Cari"
            />
            <Button
              iconName="search"
              classType="primary px-4"
              title="Cari"
              onClick={handleSearch}
            />
            <Filter>
              <DropDown
                ref={searchFilterSort}
                forInput="ddUrut"
                label="Urut Berdasarkan"
                type="none"
                arrData={dataFilterSort}
                defaultValue="[Kode Pelanggan] asc"
              />
              <DropDown
                ref={searchFilterStatus}
                forInput="ddStatus"
                label="Status"
                type="none"
                arrData={dataFilterStatus}
                defaultValue="Aktif"
              />
              <DropDown
                ref={searchFilterYear}
                forInput="ddYear"
                label="Tahun"
                type="none"
                arrData={getYearsList()}
                defaultValue={new Date().getFullYear()}
              />
            </Filter>
          </div>
        </div>
        <div className="mt-3">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="d-flex flex-column">
              <Table
                data={currentData}
                onToggle={handleSetStatus}
                onDetail={handleChangePage}
                onEdit={handleChangePage}
              />
              <Paging
                pageSize={PAGE_SIZE}
                pageCurrent={currentFilter.page}
                totalData={currentData[0]["Count"]}
                navigation={handleSetCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
