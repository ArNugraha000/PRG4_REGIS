import XLSX from 'xlsx';

const exportToExcel = (data, fileName) => {
  // Membuat workbook baru
  const workbook = XLSX.utils.book_new();
  
  // Mengkonversi data menjadi sheet
  const sheet = XLSX.utils.json_to_sheet(data);
  
  // Menambahkan sheet ke workbook
  XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
  
  // Mengekspor workbook ke file Excel
  XLSX.writeFile(workbook, fileName);
};

export default exportToExcel;