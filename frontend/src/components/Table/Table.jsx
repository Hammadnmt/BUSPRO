/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
// import Button from "../components/Button";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
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
    <div className="container-fluid d-inline-flex flex-column">
      {onCreate ? (
        <Button className="w-25" variant="success" onClick={onCreate}>
          Add
        </Button>
      ) : (
        ""
      )}
      {data.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="bg-indigo-600 text-white">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3 text-left">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4">
                    {item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    {
                      <button onClick={() => onUpdate(item._id)}>
                        <EditIcon className="icons" />
                      </button>
                    }
                    {
                      <button onClick={() => onDelete(item._id)}>
                        <DeleteIcon className="icons" />
                      </button>
                    }
                  </div>
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
