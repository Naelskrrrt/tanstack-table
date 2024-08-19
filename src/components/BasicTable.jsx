import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	getPaginationRowModel,
} from "@tanstack/react-table";
import mData from "../../MOCK_DATA.json";
import { useMemo } from "react";
import { DateTime } from "luxon";

const BasicTable = () => {
	const data = useMemo(() => mData, []);

	/*

    {
		"id": 1,
		"first_name": "Vickie",
		"last_name": "Witherby",
		"email": "vwitherby0@arstechnica.com",
		"gender": "Female",
		"dob": "12/20/2023"
	},

     */
	const columns = [
		{
			header: "ID",
			accessorKey: "id",
			footer: "ID",
		},
		{
			header: "Name",
			accessorFn: (row) => `${row.first_name} ${row.last_name}`,
		},
		{
			header: "Email",
			accessorKey: "email",
		},
		{
			header: "Gender",
			accessorKey: "gender",
		},
		{
			header: "Date of Birth",
			accessorKey: "dob",
			// cell: (date) => {
			// 	// Parse la date dans le format MM/DD/YYYY
			// 	const parsedDate = DateTime.fromFormat(
			// 		date.getValue(),
			// 		"MM/dd/yyyy"
			// 	);

			// 	// Convertis la date au format souhaité, ici au format médian (ex: Oct 27, 2023)
			// 	const date1 = parsedDate.toLocaleString(DateTime.DATE_MED);

			// 	console.log(date1);
			// 	return date1; // Retourne la date formatée pour l'afficher dans la cellule
			// },
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});
	return (
		<div className="w3-container">
			<table className="w3-table-all">
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
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button onClick={() => table.setPageIndex(0)}>
					First Page
				</button>
				<button
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}>
					Previous Page
				</button>
				<button
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}>
					Next Page
				</button>
				<button
					onClick={() =>
						table.setPageIndex(table.getPageCount() - 1)
					}>
					Last Page
				</button>
			</div>
		</div>
	);
};

export default BasicTable;
