"use client";
import Select from "react-select";
import { counties as oklahomaCounties } from "@/lib/counties";

export default function CountySelect({ onChange, value }) {
	const selectedOption = oklahomaCounties.find(
		(option) => option.value === value
	);

	const handleChange = (selected) => {
		onChange(selected ? selected.value : "");
	};

	return (
		<Select
			options={oklahomaCounties}
			value={selectedOption}
			onChange={handleChange}
			placeholder="Select a county..."
			className="react-select-container text-black"
			classNamePrefix="react-select"
			isClearable
		/>
	);
}
