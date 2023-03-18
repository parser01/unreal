import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import styled, {
	css,
	DefaultTheme,
	keyframes,
	ThemeProvider,
} from "styled-components";
import { menuItems } from "../data";
import AboutPage from "../pages/AboutPage";
import HomePage from "../pages/HomePage";
import LatestPage from "../pages/LatestPage";
import NotFoundPage from "../pages/NotFoundPage";
import PopularPage from "../pages/PopularPage";
import PostPage from "../pages/PostPage";
import UserPage from "../pages/UserPage";
import { FormType, IFormValues } from "../types/form";
import Container from "./Container";
import Footer from "./Footer";
// import useLocalStorage from "use-local-storage";
import Header from "./Header";
import Posts from "./Posts";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Menu from "./UI/Menu";
import Modal from "./UI/Modal";
import Popup from "./UI/Popup";
import ScrollToTop from "./UI/ScrollToTop";
import SearchBar from "./UI/SearchBar";
import Select from "./UI/Select";

interface IFormSwitcherProps {
	selected: boolean;
	onClick: () => void;
}

interface IStyledAppProps {
	searchIsVisible: boolean;
	popupIsTakenAway: boolean;
	modalIsActive: boolean;
}

const slideToTop = keyframes`
   from {
      visibility: hidden;
      opacity: 0;
      transform: translateY(135%);
   } 

   to {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
   }
`;

const slideToBottom = keyframes`
   from {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
   } 

   to {
      visibility: hidden;
      opacity: 0;
      transform: translateY(135%);
   }
`;

const FormSwitcher = styled.div<IFormSwitcherProps>`
	cursor: pointer;
	color: ${({ selected }) => (selected ? "#fff" : "#a1a7bb")};
	font-size: 22px;
`;

const StyledApp = styled.div<IStyledAppProps>`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	overflow: hidden;
	background-color: #000;
	/* background-color: #fff; */

	.search-bar,
	.search-bar {
		/* transition: visibility 1s, opacity 1s; */
		/* transition: height 0.3s; */
		/* height: 0; */
		/* 		transition: transform 1s;
		transform-origin: center top; */

		${({ searchIsVisible }) =>
			searchIsVisible
				? css`
						/* 						visibility: visible;
						opacity: 1; */
						/* transform: scaleY(1); */
						/* height: 56px; */
				  `
				: css`
						/* 						visibility: hidden;
						opacity: 0; */
						/* height: 0; */
						/* transform: scaleY(0); */
				  `}
	}

	main {
		flex: 1 1 auto;
		padding: 30px 0;
	}

	.form-type {
		display: flex;
		justify-content: center;
		margin: 0 -20px 35px;

		${FormSwitcher} {
			margin: 0 20px;
		}
	}

	.modal-input {
		margin-bottom: 16px;
	}

	.input-error-message {
		margin-top: 11px;
		color: #ff1749;
		font-size: 12px;
		line-height: 1.5;
		letter-spacing: 1px;
	}

	.modal-btn {
		margin-top: 16px;
	}

	${Popup} {
		visibility: ${({ popupIsTakenAway }) =>
			popupIsTakenAway ? "visible" : "hidden"};
		animation: ${({ popupIsTakenAway }) =>
			popupIsTakenAway
				? css`
						${slideToBottom} 0s forwards
				  `
				: css`
						${slideToTop} 1s 5s forwards
				  `};
	}

	.popup-content {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.popup-text {
			color: #fff;
			font-weight: 700;
			font-size: 18px;
		}

		.popup-btns {
			display: flex;
			margin: 0 5px;
		}

		${Button} {
			margin: 0 5px;
		}
	}
`;

const lightTheme: DefaultTheme = {
	headerBg: "#fff",
	mainBg: "#fff",
	fontColor: "#000",
	buttonBg: "#fff",
	buttonColor: "#3861fb",
	iconColor: "#000",
};

const darkTheme: DefaultTheme = {
	headerBg: "##17171a",
	mainBg: "#000",
	fontColor: "#fff",
	buttonBg: "#000",
	buttonColor: "#fff",
	iconColor: "#fff",
};

if (!localStorage.getItem("currentTheme")) {
	console.log("localstorage");
	localStorage.setItem("currentTheme", "dark");
}

const currentThemeLocalStorage = localStorage.getItem("currentTheme");

const App = (): JSX.Element => {
	const [isAuth, setIsAuth] = useState(false);
	const [menuIsActive, setMenuIsActive] = useState(false);
	const [searchIsActive, setSearchIsActive] = useState(false);

	const [currentTheme, setCurrentTheme] = useState(currentThemeLocalStorage);
	// const [theme, setTheme] = useLocalStorage("theme", "dark");
	const [searchValue, setSearchValue] = useState("");

	const [modalIsActive, setModalIsActive] = useState(false);
	const [formType, setFormType] = useState<FormType | null>(null);
	const [popupIsTakenAway, setPopupIsTakenAway] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormValues>();

	const navigate = useNavigate();

	console.log(errors);

	const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		setSearchValue(event.target.value);
	};

	const onModalClose = () => {
		setPopupIsTakenAway(false);
	};

	const onAuthSubmit = async (authCredentials: IFormValues): Promise<void> => {
		console.log("onAuthSubmit");
		try {
			await axios.post(
				`http://localhost:5000/${formType}`,
				authCredentials,
				{ withCredentials: true }
			);
			setModalIsActive(false);
			setIsAuth(true);
			navigate(`/${authCredentials.email}`);
		} catch (error) {
			console.log("onAuthSubmit", error);
		}
	};

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await axios.post(
					"http://localhost:5000/auth",
					undefined,
					{
						withCredentials: true,
					}
				);
				if (response.data === "Authorized") {
					setIsAuth(true);
				} else {
					// setIsAuth(false);
				}
			} catch (error) {
				console.error(error);
				// setIsAuth(false);
			}
		};

		checkAuth();
	}, []);

	console.log(isAuth, "isAuth");

	return (
		<ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
			<StyledApp
				className="App"
				searchIsVisible={searchIsActive}
				popupIsTakenAway={popupIsTakenAway}
				modalIsActive={modalIsActive}
			>
				<Header
					isAuth={isAuth}
					setIsAuth={setIsAuth}
					setSearchIsVisible={setSearchIsActive}
					currentTheme={currentTheme}
					setCurrentTheme={setCurrentTheme}
					setMenuIsActive={setMenuIsActive}
					setModalIsActive={setModalIsActive}
					setPopupIsTakenAway={setPopupIsTakenAway}
					setFormType={setFormType}
				/>
				<Container>
					<div className="search-bar">
						<SearchBar
							isActive={searchIsActive}
							placeholder="Search..."
							value={searchValue}
							onChange={onSearchChange}
						/>
					</div>
				</Container>
				<main>
					<Container>
						<Routes>
							<Route
								path="/"
								element={<HomePage searchValue={searchValue} />}
							/>
							<Route path="/latest" element={<LatestPage />} />
							<Route path="/popular" element={<PopularPage />} />
							<Route path="/about" element={<AboutPage />} />
							<Route path="/post/:title" element={<PostPage />} />
							<Route path="*" element={<NotFoundPage />} />
							{isAuth && <Route path="/:email" element={<UserPage />} />}
						</Routes>
					</Container>
				</main>
				<Footer />
				<Menu isActive={menuIsActive} setIsActive={setMenuIsActive}>
					{menuItems
						.map((menuItem, index) => (
							<a key={index} href={menuItem.href}>
								{menuItem.content}
							</a>
						))
						.concat(
							<Button fullWidth bg="#3861fb">
								Log in
							</Button>,
							<Button fullWidth bg="#3861fb">
								Sign up
							</Button>
						)
						.map((item, index) => (
							<Fragment key={index}>{item}</Fragment>
						))}
				</Menu>
				<Modal
					isActive={modalIsActive}
					setIsActive={setModalIsActive}
					onClose={onModalClose}
				>
					<div className="form-type">
						<FormSwitcher
							selected={formType === "log-in"}
							onClick={() => setFormType("log-in")}
						>
							Log in
						</FormSwitcher>
						<FormSwitcher
							selected={formType === "sign-up"}
							onClick={() => setFormType("sign-up")}
						>
							Sign up
						</FormSwitcher>
					</div>
					<form action="" onSubmit={handleSubmit(onAuthSubmit)}>
						<div className="modal-input">
							<Input
								label="Email address"
								placeholder="Enter your email address"
								name="email"
								register={register}
								required="Email address cannot be empty"
								pattern={{
									value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
									message: "Email address is not valid",
								}}
							/>
							{errors.email?.message && (
								<p className="input-error-message">
									{errors.email?.message}
								</p>
							)}
						</div>
						<div className="modal-input">
							<Input
								type="password"
								label="Password"
								placeholder="Enter your password"
								name="password"
								register={register}
								required="Password cannot be empty"
								minLength={{
									value: 3,
									message:
										"Password must contain at least 3 characters",
								}}
								maxLength={{
									value: 8,
									message:
										"Password must contain at most 8 characters",
								}}
							/>
							{errors.password?.message && (
								<p className="input-error-message">
									{errors.password?.message}
								</p>
							)}
						</div>
						<Button className="modal-btn" fullWidth bg="#3861fb">
							{formType === "log-in" ? "Log in" : "Create an account"}
						</Button>
					</form>
				</Modal>
				<Popup>
					<div className="popup-content">
						<div className="popup-text">
							Sign up to receive email notifications
						</div>
						<div className="popup-btns">
							<Button
								bg="#3861fb"
								onClick={() => {
									setFormType("sign-up");
									setModalIsActive(true);
									setPopupIsTakenAway(true);
								}}
							>
								Sign up and stay tuned
							</Button>
							<Button onClick={() => setPopupIsTakenAway(true)}>
								Maybe later
							</Button>
						</div>
					</div>
				</Popup>
				<Select options={["EN", "RU", "TR"]} defaultOption="RU" />
				<ScrollToTop smooth />
			</StyledApp>
		</ThemeProvider>
	);
};

export default App;
