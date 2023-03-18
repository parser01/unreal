import styled, { useTheme } from "styled-components";
import Button from "./UI/Button";
import logo from "../assets/logo.png";
import { HiMenuAlt3, HiMoon, HiSearch, HiSun } from "react-icons/hi";
import Container from "./Container";
import Select2 from "./UI/Select2";
import { FormType } from "../types/form";
import { menuItems } from "../data";
import { Link } from "react-router-dom";
import axios from "axios";

interface IHeaderProps {
	isAuth: boolean;
	setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
	setSearchIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	currentTheme: string | null;
	setCurrentTheme: React.Dispatch<React.SetStateAction<string | null>>;
	setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	setModalIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	setPopupIsTakenAway: React.Dispatch<React.SetStateAction<boolean>>;
	setFormType: React.Dispatch<React.SetStateAction<FormType | null>>;
}

const StyledHeader = styled.header`
	/* background-color: #17171a; */
	background-color: ${({ theme }) => theme.headerBg};

	.flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 0;
	}

	.menu {
		display: none;
		margin: 0 30px;

		@media (min-width: 768px) {
			display: block;
		}

		ul {
			display: flex;
			margin: 0 -10px;
		}

		li {
			margin: 0 10px;
		}

		a {
			/* color: #fff; */
			color: ${({ theme }) => theme.fontColor};
			font-weight: 600;
			font-size: 16px;
			letter-spacing: 1px;
			transition: color 0.2s;
		}

		a:hover {
			color: #3861fb;
		}
	}

	.btns {
		display: flex;
		align-items: center;
		margin: 0 -10px;

		.search-btn,
		.theme-btn,
		.menu-btn {
			cursor: pointer;
		}

		.search-btn,
		${Select2}, .theme-btn,
		.auth-btn,
		.menu-btn {
			margin: 0 10px;
		}

		.auth-btn {
			display: none;
		}

		@media (min-width: 768px) {
			.auth-btn {
				display: block;
			}

			.menu-btn {
				display: none;
			}
		}
	}
`;

const Header = ({
	isAuth,
	setIsAuth,
	setSearchIsVisible,
	currentTheme,
	setCurrentTheme,
	setMenuIsActive,
	setModalIsActive,
	setPopupIsTakenAway,
	setFormType,
}: IHeaderProps): JSX.Element => {
	// const [language, setLanguage] = useState("en");
	const styledTheme = useTheme();

	console.log(styledTheme);
	console.log(isAuth);

	const changeTheme = () => {
		if (localStorage.getItem("currentTheme") === "dark") {
			setCurrentTheme("light");
			localStorage.setItem("currentTheme", "light");
		} else {
			setCurrentTheme("dark");
			localStorage.setItem("currentTheme", "dark");
		}
	};

	/* 	const changeTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}; */

	const logOut = async () => {
		await axios.post("http://localhost:5000/log-out", undefined, {
			withCredentials: true,
		});
		setIsAuth(false);
	};

	return (
		<StyledHeader>
			<Container>
				<div className="flex">
					<a href="google.com">
						<img src={logo} alt="logo" />
					</a>
					<nav className="menu">
						<ul>
							{menuItems.map((menuItem) => (
								<li key={menuItem.href}>
									<Link to={menuItem.href}>{menuItem.content}</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="btns">
						<HiSearch
							className="search-btn"
							size="24"
							// color="#fff"
							color={styledTheme.iconColor}
							onClick={() => setSearchIsVisible((actual) => !actual)}
						/>
						{/* 						<Select2
							value={language}
							onChange={(e) => setLanguage(e.target.value)}
						>
							<option value="en">EN</option>
							<option value="ru">RU</option>
						</Select2> */}
						{currentTheme === "dark" ? (
							<HiSun
								className="theme-btn"
								size="28"
								// color="#fff"
								color={styledTheme.iconColor}
								// onClick={() => setTheme("dark")}
								onClick={changeTheme}
							/>
						) : (
							<HiMoon
								className="theme-btn"
								size="28"
								// color="#fff"
								color={styledTheme.iconColor}
								// onClick={() => setTheme("light")}
								onClick={changeTheme}
							/>
						)}
						{isAuth ? (
							<Button
								className="auth-btn"
								bg={styledTheme.buttonBg}
								color={styledTheme.buttonColor}
								onClick={logOut}
							>
								Log out
							</Button>
						) : (
							<>
								<Button
									className="auth-btn"
									bg={styledTheme.buttonBg}
									color={styledTheme.buttonColor}
									onClick={() => {
										setFormType("log-in");
										setModalIsActive(true);
										setPopupIsTakenAway(true);
									}}
								>
									Log in
								</Button>
								<Button
									className="auth-btn"
									bg="#3861fb"
									onClick={() => {
										setFormType("sign-up");
										setModalIsActive(true);
										setPopupIsTakenAway(true);
									}}
								>
									Sign up
								</Button>
							</>
						)}
						<HiMenuAlt3
							className="menu-btn"
							size="28"
							// color="#fff"
							color={styledTheme.iconColor}
							onClick={() => setMenuIsActive(true)}
						/>
					</div>
				</div>
			</Container>
		</StyledHeader>
	);
};

export default Header;
