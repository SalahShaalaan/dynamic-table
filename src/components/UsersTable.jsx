import { Table } from "antd";

export default function UsersTable({
  users,
  columns,
  loading,
  total,
  page,
  pageSize,
  onPageChange,
}) {
  return (
    <Table
      dataSource={users}
      columns={columns}
      loading={loading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize,
        total,
        onChange: (newPage) => onPageChange(newPage),
      }}
    />
  );
}
