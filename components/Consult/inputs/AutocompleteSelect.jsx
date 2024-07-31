import { createElement, Component } from "react";
import { useIntl } from "react-intl";
import AsyncSelectInput from "@commercetools-uikit/async-select-input";

const colourOptions = [
	{
		options: [
			{ label: "Ocean", value: "ocean", someData: 1 },
			{ label: "Blue", value: "blue", someData: 2 },
			{ label: "Purple", value: "purple", someData: 3 },
			{ label: "Red", value: "red", someData: 4 },
			{ label: "Orange", value: "orange", someData: 5 },
			{ label: "Yellow", value: "yellow", someData: 6 },
		],
	},
	{
		options: [
			{ label: "Green", value: "green", someData: 7 },
			{ label: "Forest", value: "forest", someData: 8 },
			{ label: "Slate", value: "slate", someData: 9 },
			{ label: "Silver", value: "silver", someData: 10 },
		],
	},
];

const filterColors = (inputValue) =>
	colourOptions.map((groupedOptionsList) => {
		const filteredOptions = groupedOptionsList.options.filter((option) =>
			option.label.toLowerCase().includes(inputValue.toLowerCase())
		);
		return {
			options: filteredOptions,
		};
	});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue) =>
	delay(500).then(() => filterColors(inputValue));

const SearchSelectInput = (props) => {
	const intl = useIntl();

	const isMulti = false;
	const defaultOptions = true ? colourOptions : false;
	const showOptionGroupDivider = false;
	const loadingMessage = "Loading results";
	const iconLeft = icons[select("iconLeft", ["", ...iconNames])];

	return (
		<>
			<section>
				<AsyncSelectInput
					horizontalConstraint="scale"
					hasError={false}
					hasWarning={false}
					aria-label=""
					aria-labelledby=""
					isAutofocussed={false}
					backspaceRemovesValue={true}
					controlShouldRenderValue={true}
					id=""
					containerId=""
					isClearable={false}
					isCondensed={false}
					isDisabled={false}
					isReadOnly={false}
					isMulti={isMulti}
					isSearchable={true}
					maxMenuHeight={220}
					closeMenuOnSelect={true}
					name="form-field-name"
					onBlur={"onBlur"}
					onChange={(event, info) => {
						console.log(event.target.value);
					}}
					loadingMessage={loadingMessage}
					onFocus={"onFocus"}
					onInputChange={"onInputChange"}
					placeholder="Select.."
					tabIndex="0"
					tabSelectsValue={true}
					value={value}
					// Async props
					defaultOptions={defaultOptions}
					loadOptions={loadOptions}
					cacheOptions={false}
					showOptionGroupDivider={showOptionGroupDivider}
					iconLeft={iconLeft ? iconLeft : undefined}
				/>
			</section>
		</>
	);
};

export default SearchSelectInput;
