import { useState, useEffect } from "react";
import { getUsers } from "./services/apiTable";
import UsersTable from "./components/UsersTable";
import { Alert, Button } from "antd";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, total } = await getUsers({ search, page });
      setUsers(data);
      setTotal(total);
    } catch (error) {
      setError(error.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Use the useEffect hook to fetch users when the search or page changes
    fetchUsers();
  }, [search, page]);

  const handleSearch = (value) => {
    /*
    - Set the vlaue that user input in the search state
    - When the search text is changed, we set the page to the first page, Cuz the search should start from the begining.
    */
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];

  return (
    <div className="min-h-screen bg-slate-700 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-24">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-slate-700 mb-8 text-center">
            Users Table
          </h1>

          {/* Rendering Error Message with a button that will treiger the fetchUsers function again to fetch the data again */}
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              action={
                <Button size="small" type="primary" onClick={fetchUsers}>
                  Try Again
                </Button>
              }
              className="mb-6"
            />
          )}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search Users By their username"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full outline-none focus:border-cyan-600 transition-colors duration-200"
            />
          </div>

          <UsersTable
            columns={columns}
            users={users}
            loading={loading}
            total={total}
            page={page}
            pageSize={5}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
