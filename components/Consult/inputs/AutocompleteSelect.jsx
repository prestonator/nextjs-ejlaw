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

const SearchSelectInput = (props) => {
	const intl = useIntl();
	return (
		<>
			<section>
				<AsyncSelectInput
					horizontalConstraint={select(
						"horizontalConstraint",
						Constraints.getAcceptedMaxPropValues(3),
						"scale"
					)}
					hasError={boolean("hasError", false)}
					hasWarning={boolean("hasWarning", false)}
					aria-label={text("aria-label", "")}
					aria-labelledby={text("aria-labelledby", "")}
					isAutofocussed={boolean("isAutofocussed", false)}
					backspaceRemovesValue={boolean("backspaceRemovesValue", true)}
					controlShouldRenderValue={boolean("controlShouldRenderValue", true)}
					id={text("id", "")}
					containerId={text("containerId", "")}
					isClearable={boolean("isClearable", false)}
					isCondensed={boolean("isCondensed", false)}
					isDisabled={boolean("isDisabled", false)}
					isReadOnly={boolean("isReadOnly", false)}
					isMulti={isMulti}
					isSearchable={boolean("isSearchable", true)}
					maxMenuHeight={number("maxMenuHeight", 220)}
					closeMenuOnSelect={boolean("closeMenuOnSelect", true)}
					name={text("name", "form-field-name")}
					onBlur={action("onBlur")}
					onChange={(event, info) => {
						action("onChange")(event, info);
						onChange(event.target.value);
					}}
					loadingMessage={loadingMessage}
					onFocus={action("onFocus")}
					onInputChange={action("onInputChange")}
					placeholder={text("placeholder", "Select..")}
					tabIndex={text("tabIndex", "0")}
					tabSelectsValue={boolean("tabSelectsValue", true)}
					value={value}
					// Async props
					defaultOptions={defaultOptions}
					loadOptions={loadOptions}
					cacheOptions={boolean("cacheOptions", false)}
					showOptionGroupDivider={showOptionGroupDivider}
					iconLeft={iconLeft ? createElement(iconLeft) : undefined}
					{...addMenuPortalProps()}
				/>
			</section>
		</>
	);
};

export default SearchSelectInput;
