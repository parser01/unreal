import { HiX } from "react-icons/hi";
import styled from "styled-components";
// import { IMenuItem } from "../../types/menu";

interface IMenuProps {
	children?: React.ReactNode;
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	onOpen?: () => void;
	onClose?: () => void;
}

interface IStyledMenuProps {
	isActive: boolean;
}

const StyledMenu = styled.div<IStyledMenuProps>`
	width: 100%;

	.menu__overlay {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 11;
		display: ${({ isActive }) => (isActive ? "block" : "none")};
		background-color: rgba(0, 0, 0, 0.5);
	}

	.menu__content {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 12;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 65%;
		padding: 0 25px;
		transform: ${({ isActive }) =>
			isActive ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)"};
		transition: transform 0.3s;
		background-color: #17171a;
	}

	.menu__close-btn {
		position: absolute;
		top: 15px;
		right: 15px;
		cursor: pointer;
	}

	.menu__items {
		text-align: center;

		.menu__item {
			margin-bottom: 25px;
		}

		a {
			color: #fff;
			font-weight: 600;
			font-size: 18px;
			letter-spacing: 1px;
			transition: color 0.2s;
		}

		a:hover {
			color: #3861fb;
		}
	}
`;

const Menu = ({
	isActive,
	setIsActive,
	children,
	onOpen = () => {},
	onClose = () => {},
}: IMenuProps) => {
	/* if (isActive) {
		document.body.style.transform = "translateX(-25%)";
		document.body.style.transition = "transform .3s";
	} else {
		document.body.style.transform = "translateX(0)";
	} */

	if (isActive) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}

	console.log(children);

	return (
		<StyledMenu
			isActive={isActive}
			onClick={(event) => event.stopPropagation()}
		>
			<div
				className="menu__overlay"
				onClick={() => {
					setIsActive(false);
					onClose();
				}}
			/>
			<div className="menu__content">
				<HiX
					className="menu__close-btn"
					size="28"
					color="#fff"
					onClick={() => {
						setIsActive(false);
						onClose();
					}}
				/>
				{/* 				<ul className="menu__items">
					{items.map((item) => (
						<li className="menu__item" key={item.href}>
							<a href={item.href}>{item.content}</a>
						</li>
					))}
				</ul> */}
				<div className="menu__items">
					{children instanceof Array
						? children.map((child, index) => (
								<div className="menu__item" key={index}>
									{child}
								</div>
						  ))
						: children}
				</div>
			</div>
		</StyledMenu>
	);
};

export default Menu;
