import { useState } from "react";
import styled from "styled-components";

interface ISelectProps {
	options: string[];
	defaultOption: string;
}

interface IStyledSelectProps {
	active: boolean;
}

const StyledSelect = styled.div<IStyledSelectProps>`
	position: fixed;
	bottom: 150px;
	right: 25px;

	.options_not-selected {
		transform: ${({ active }) => (active ? "scaleY(1)" : "scaleY(0)")};
		transform-origin: 50% bottom;
		transition: transform 0.3s;
	}

	.option {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 48px;
		height: 48px;
		cursor: pointer;
		background-color: #3861fb;
		color: #fff;
		font-weight: 600;
		font-size: 14px;

		&_default {
			border: 1px solid #fff;
		}
	}
`;

const Select = ({ options, defaultOption }: ISelectProps): JSX.Element => {
	const [optionsAreActive, setOptionsAreActive] = useState(false);
	const [optionsNotSelected, setOptionsNotSelected] = useState<typeof options>(
		options.filter((option) => option !== defaultOption)
	);
	const [selectedOption, setSelectedOption] = useState(defaultOption);

	document.body.addEventListener("click", () => setOptionsAreActive(false));

	return (
		<StyledSelect active={optionsAreActive}>
			<div className="options_not-selected">
				{optionsNotSelected.map((option) => (
					<div
						className="option"
						key={option}
						onClick={() => {
							setSelectedOption(option);
							setOptionsNotSelected(
								options.filter((opt) => opt !== option)
							);
						}}
					>
						{option}
					</div>
				))}
			</div>
			<div
				className="option option_default"
				onClick={(event) => {
					event.stopPropagation();
					setOptionsAreActive(!optionsAreActive);
				}}
			>
				{selectedOption}
			</div>
		</StyledSelect>
	);
};

export default Select;
