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
        <Button variant="success" className="mb-3 w-25" onClick={onCreate}>
          Add
        </Button>
      )}
      {data.length > 0 ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="bg-indigo-600 text-white">
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
                className="hover:bg-gray-100"
              >
                {columns.map((col) => (
                  <td key={col.key || col.header} className="px-6 py-4">
                    {item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 d-flex justify-content-around">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onUpdate(item._id)}
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(item._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-gray-600 mt-4">No data available.</p>
      )}
    </div>
  );
}
