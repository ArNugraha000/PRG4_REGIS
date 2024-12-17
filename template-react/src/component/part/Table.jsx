import Icon from "./Icon";

export default function Table({
  data,
  onToggle = () => {},
  onDetail = () => {},
  onEdit = () => {},
}) {
  let colPosition;
  let colCount = 0;

  function generateActionButton(columnName, value, key, ID, status) {
    if (columnName !== "Aksi") return value;

    const listButton = value.map((action) => {
      switch (action) {
        case "Toggle": {
          if (status === "Aktif") {
            return (
              <Icon
                key={key + action}
                name="toggle-on"
                type="Bold"
                cssClass="btn px-1 py-0 text-primary"
                title="Nonaktifkan"
                onClick={() => {
                  console.log("Toggle button clicked for ID:", ID); // Log button click
                  onToggle(ID);
                }}
              />
            );
          } else if (status === "Tidak Aktif") {
            return (
              <Icon
                key={key + action}
                name="toggle-off"
                type="Bold"
                cssClass="btn px-1 py-0 text-primary"
                title="Aktifkan"
                onClick={() => {
                  console.log("Toggle button clicked for ID:", ID); // Log button click
                  onToggle(ID);
                }}
              />
            );
          }
          break;
        }
        case "Detail":
          return (
            <Icon
              key={key + action}
              name="overview"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Lihat Detail"
              onClick={() => {
                console.log("Detail button clicked for ID:", ID); // Log button click
                onDetail("detail", ID);
              }}
            />
          );
        case "Edit": // Tambahan case untuk Edit
          return (
            <Icon
              key={key + action}
              name="edit"
              type="Bold"
              cssClass="btn px-1 py-0 text-primary"
              title="Edit Data"
              onClick={() => {
                console.log("Edit button clicked for ID:", ID); // Log button click
                onEdit("edit", ID); // Fungsi onEdit harus didefinisikan
              }}
            />
          );
        default:
          return null;
      }
    });

    return listButton;
  }

  return (
    <div className="flex-fill">
      <table className="table table-hover table-striped table-light border">
        <thead>
          <tr>
            {Object.keys(data[0]).map((value, index) => {
              if (
                value !== "Key" &&
                value !== "Count" &&
                value !== "Alignment"
              ) {
                colCount++;
                return (
                  <th key={"Header" + index} className="text-center">
                    {value}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data[0].Count !== 0 &&
            data.map((value, rowIndex) => {
              colPosition = -1;
              return (
                <tr key={value["Key"]}>
                  {Object.keys(value).map((column, colIndex) => {
                    if (
                      column !== "Key" &&
                      column !== "Count" &&
                      column !== "Alignment"
                    ) {
                      colPosition++;

                      return (
                        <td
                          key={rowIndex + "" + colIndex}
                          style={{
                            textAlign: value["Alignment"][colPosition],
                          }}
                        >
                          {generateActionButton(
                            column,
                            value[column],
                            "Action" + rowIndex + colIndex,
                            value["Key"],
                            value["Status"]
                          )}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          {data[0].Count === 0 && (
            <tr>
              <td colSpan={colCount}>No data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
