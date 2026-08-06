// src/admin/tables/LeadsColumns.js
export const LeadsColumns = [
  { accessorKey: 'id', header: 'ID', enableColumnOrdering: false },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'createdAt', header: 'Created', Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString() },
  { accessorKey: 'updatedAt', header: 'Updated', Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString() }
];
