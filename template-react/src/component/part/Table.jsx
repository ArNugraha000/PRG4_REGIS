import Icon from "./Icon";

export default function Table({
	data,
	onDelete = () => {},
	onDetail = () => {},
	onEdit = () => {},
	onApprove = () => {},
	onReject = () => {},
	onSent = () => {},
}) {
	let colPosition;
	let colCount = 0;

	function generateActionButton(columnName, value, key, ID) {
		if (columnName !== "Aksi") return value;

		const listButton = value.map((action) => {
			switch (action) {
				case "Delete":
					return (
						<Icon
							key={key + action}
							name="trash"
							type="Bold"
							cssClass="btn px-1 py-0"
							title="Hapus"
							onClick={onDelete}
						/>
					);
				case "Detail":
					return (
						<Icon
							key={key + action}
							name="overview"
							type="Bold"
							cssClass="btn px-1 py-0"
							title="Lihat Detail"
							onClick={() => onDetail("detail", ID)}
						/>
					);
				case "Edit":
					return (
						<Icon
							key={key + action}
							name="edit"
							type="Bold"
							cssClass="btn px-1 py-0"
							title="Ubah"
							onClick={onEdit}
						/>
					);
				case "Approve":
					return (
						<Icon
							key={key + action}
							name="check"
							type="Bold"
							cssClass="btn px-1 py-0"
							title="Setujui Pengajuan"
							onClick={onApprove}
						/>
					);
				case "Reject":
					return (
						<Icon
							key={key + action}
							name="cross"
							type="Bold"
							cssClass="btn px-1 py-0"
							title="Tolak Pengajuan"
							onClick={onReject}
						/>
					);
				case "Sent":
					return (
						<Icon
							key={key + action}
							name="paper-plane"
							type="Bold"
							cssClass="btn px-1 py-0"
							title="Kirim Pengajuan"
							onClick={onSent}
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
			<table className="table table-hover table-striped table table-light border">
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
														value["Key"]
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
