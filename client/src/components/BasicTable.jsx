import { useMemo } from 'react'
import mData from '../data/MOCK_DATA.json'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

export const BasicTable = () => {
	const data = useMemo(() => mData, [])

	const columns = [
		{
			header: 'ID',
			accessorKey: 'id',
			footer: 'ID',
		},
		{
			header: 'First Name',
			accessorKey: 'firstName',
			footer: 'First Name',
		},
		{
			header: 'Last Name',
			accessorKey: 'lastName',
			footer: 'Last Name',
		},
		{
			header: 'Email',
			accessorKey: 'email',
			footer: 'Email',
		},
		{
			header: 'Gender',
			accessorKey: 'gender',
			footer: 'Gender',
		},
		{
			header: 'Date of Birth',
			accessorKey: 'dob',
			footer: 'Date of Birth',
		},
	]

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot></tfoot>
			</table>
		</div>
	)
}
