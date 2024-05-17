import React from "react";
import Button from "../part/Button";
import Input from "../part/Input";
import Filter from "../part/Filter";
import DropDown from "../part/Dropdown";
import ButtonClick from "../part/ButtonClick";
import { useNavigation } from "../../utils/useNavigation";

const SearchBarFacility = ({
	searchQuery,
	searchFilterSort,
	searchFilterStatus,
	handleKeyDown,
	handleSearch,
	dataFilterSort,
	dataFilterStatus,
	to,
	defaultSorting,
	defaultFilterStatus,
	cou_id,
	course,
}) => {
	const navigate = useNavigation();
	return (
		<div className="flex-fill">
			<div className="input-group">
				<ButtonClick
					iconName="add"
					classType="success"
					label="Tambah"
					onClick={() =>
						navigate("add-facility", {
							state: {
								cou_id: cou_id,
								course: course,
							},
						})
					}
				/>

				<Input
					ref={searchQuery}
					forInput="pencarianAlatMesin"
					placeholder="Cari"
					onKeyDown={handleKeyDown}
				/>
				<Button
					iconName="search"
					classType="primary px-4"
					title="Cari"
					onClick={handleSearch}
				/>
				<Filter>
					<DropDown
						ref={searchFilterSort}
						forInput="ddUrut"
						label="Urut Berdasarkan"
						type="none"
						arrData={dataFilterSort}
						defaultValue={defaultSorting}
					/>
					<DropDown
						ref={searchFilterStatus}
						forInput="ddStatus"
						label="Status"
						type="none"
						arrData={dataFilterStatus}
						defaultValue={defaultFilterStatus}
					/>
				</Filter>
			</div>
		</div>
	);
};

export default SearchBarFacility;
