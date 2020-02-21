import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const FILETYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const FILE_EXTENSION = "xlsx";
const DEFAULT_FILE_NAME = "Cirugías";

function generateAndDownloadFile(jsonData, fileName = DEFAULT_FILE_NAME) {
  const ws = XLSX.utils.json_to_sheet(jsonData, { dateNF: "DD/MM/YYYY" });
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: FILE_EXTENSION,
    type: "array"
  });
  const file = new Blob([excelBuffer], { type: FILETYPE });
  return FileSaver.saveAs(file, `${fileName}.${FILE_EXTENSION}`);
}

function transformSurgery(firebaseSurgery) {
  return {
    Fecha: firebaseSurgery.date.toDate(),
    "Número afiliado": firebaseSurgery.affiliate,
    "Nombre afiliado": firebaseSurgery.affiliateName,
    "Centro Médico": firebaseSurgery.center,
    Médico: firebaseSurgery.doctor,
    "Obra social": firebaseSurgery.social,
    Cirugía: firebaseSurgery.surgery
  };
}

export { generateAndDownloadFile, transformSurgery };
