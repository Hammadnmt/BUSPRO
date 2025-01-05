import { useNavigate } from "react-router";
import { Button, Table } from "react-bootstrap";
import Loader from "../components/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ReusableTable({
  data = [],
  columns = [],
  isLoading = false,
  isFetching = false,
  onCreate,
  onDelete,
  onUpdate,
}) {
  const navigate = useNavigate();

  return isLoading && isFetching ? (
    <Loader />
  ) : (
    <div className="container-fluid d-flex flex-column">
      {onCreate && (
        <Button
          variant="success"
          className="mb-3 w-25"
          onClick={onCreate}
          style={{
            backgroundColor: "#364F6B",
            borderColor: "#364F6B",
            color: "white",
          }}
        >
          Add
        </Button>
      )}
      {data.length > 0 ? (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm"
          style={{
            borderCollapse: "collapse",
            borderColor: "rgba(54, 79, 107, 0.3)", // Thin and transparent
          }}
        >
          <thead style={{ backgroundColor: "#364F6B", color: "white" }}>
            <tr>
              {columns.map((col) => (
                <th key={col.header} className="px-6 py-3 text-left">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id || item._id?.toString()}
                style={{ cursor: "pointer" }}
                className="hover-row"
              >
                {columns.map((col) => (
                  <td key={col.key || col.header} className="px-6 py-4">
                    {item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 d-flex justify-content-around">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => onUpdate(item._id)}
                    style={{
                      backgroundColor: "#364F6B",
                      color: "white",
                      borderColor: "#364F6B",
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => onDelete(item._id)}
                    style={{
                      backgroundColor: "rgba(220, 53, 69, 0.85)",
                      color: "white",
                      borderColor: "rgba(220, 53, 69, 0.85)",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted mt-4">No data available.</p>
      )}
    </div>
  );
}
