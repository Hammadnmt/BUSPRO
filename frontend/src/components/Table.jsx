import React from "react";
import { useNavigate } from "react-router";
import { Table, Button, Card, Badge } from "react-bootstrap";
import { Pencil, Trash2, Plus, RefreshCw } from "lucide-react";

const ReusableTable = ({
  data = [],
  columns = [],
  isLoading = false,
  isFetching = false,
  onCreate,
  onDelete,
  onUpdate,
  title = "Data Table",
}) => {
  const navigate = useNavigate();

  if (isLoading && isFetching) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <RefreshCw className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 text-primary fw-bold">{title}</h5>
          {data.length > 0 && (
            <small className="text-muted">
              Showing {data.length} {data.length === 1 ? "entry" : "entries"}
            </small>
          )}
        </div>
        {onCreate && (
          <Button
            variant="primary"
            className="d-flex align-items-center gap-2 rounded-pill px-4"
            onClick={onCreate}
          >
            <Plus size={18} />
            <span>Add New</span>
          </Button>
        )}
      </Card.Header>

      <Card.Body className="p-0">
        {data.length > 0 ? (
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr className="bg-light">
                  {columns.map((col) => (
                    <th
                      key={col.header}
                      className="px-4 py-3 border-0 text-dark"
                    >
                      {col.header}
                    </th>
                  ))}
                  <th
                    className="px-4 py-3 border-0 text-dark text-center"
                    width="140"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item._id || item._id?.toString()}
                    className="align-middle"
                  >
                    {columns.map((col) => (
                      <td key={col.key || col.header} className="px-4 py-3">
                        {item[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <div className="d-flex gap-2 justify-content-center">
                        <Button
                          variant="light"
                          size="sm"
                          className="d-flex align-items-center justify-content-center p-2 rounded-circle"
                          onClick={() => onUpdate(item._id)}
                        >
                          <Pencil size={16} className="text-primary" />
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          className="d-flex align-items-center justify-content-center p-2 rounded-circle"
                          onClick={() => onDelete(item._id)}
                        >
                          <Trash2 size={16} className="text-danger" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted mb-0">No data available.</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReusableTable;
