import { HiSearch } from "react-icons/hi";
import styled from "styled-components";

interface ISearchBarProps {
	isActive?: boolean;
	placeholder?: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface IStyledSearchBarProps {
	isActive: boolean;
}

const StyledSearchBar = styled.div<IStyledSearchBarProps>`
	display: flex;

	.search-input {
		width: 100%;
		height: ${({ isActive }) => (isActive ? "56px" : "0")};
		padding: 0 18px;
		border-width: ${({ isActive }) => (isActive ? "1px" : "0")};
		border-style: solid;
		border-color: #40424e;
		border-bottom-left-radius: 8px;
		background-color: #171924;
		color: #fff;
		font-size: 14px;
		letter-spacing: 1px;
		transition: height 0.3s, border-width 0.2s;

		&:hover {
			border-color: #3861fb;
		}

		&:focus {
			border-color: #3861fb;
			box-shadow: 0 0 0 4px rgb(56, 97, 251, 0.3);
		}
	}

	.search-btn {
		height: ${({ isActive }) => (isActive ? "56px" : "0")};
		width: 56px;
		border-bottom-right-radius: 8px;
		background-color: #3861fb;
		transition: height 0.3s;

		.search-icon {
			transform: ${({ isActive }) => (isActive ? "scale(1)" : "scale(0)")};
			opacity: ${({ isActive }) => (isActive ? "1" : "0")};
			transition: transform 0.3s, opacity 0.3s;
		}
	}
`;

const SearchBar = ({
	isActive = false,
	placeholder,
	value,
	onChange,
}: ISearchBarProps) => {
	return (
		<StyledSearchBar isActive={isActive}>
			<input
				className="search-input"
				type="search"
				placeholder={placeholder}
				aria-label="search"
				value={value}
				onChange={onChange}
			/>
			<button className="search-btn" aria-label="search">
				<HiSearch className="search-icon" size="24" color="#fff" />
			</button>
		</StyledSearchBar>
	);
};

export default SearchBar;
