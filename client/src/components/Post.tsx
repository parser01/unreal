import styled from "styled-components";
import { IPost } from "../types/post";
import image from "../assets/unseen-world.jpg";
import { Link } from "react-router-dom";

interface IPostProps extends IPost {}

const StyledPost = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	box-shadow: 0 0 5px #3861fb;
	background-color: #17171a;
	color: #fff;

	.post-image {
		img {
			max-width: 100%;
			border-radius: 8px 8px 0 0;
		}
	}

	.post-description {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		padding: 30px 20px 20px;

		.post-title {
			margin-bottom: 15px;
			font-weight: 600;
			font-size: 22px;
			line-height: 1.7;
		}

		.post-date {
			margin-bottom: 15px;
			font-size: 13px;
		}

		.post-body {
			flex: 1 1 auto;
			margin-bottom: 15px;
			font-size: 14px;
			line-height: 1.7;
		}

		.read-more {
			align-self: flex-start;
			background-color: transparent;
			color: #3861fb;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 1px;
		}
	}
`;

const Post = ({ title, date, body }: IPostProps): JSX.Element => {
	return (
		<Link to={`/post/${title}`}>
			<StyledPost>
				<div className="post-image">
					<img src={image} alt={""} />
				</div>
				<div className="post-description">
					<div className="post-title">{title}</div>
					<div className="post-date">{date}</div>
					<div className="post-body">{body}</div>
					<button className="read-more" type="button">
						Read more
					</button>
				</div>
			</StyledPost>
		</Link>
	);
};

export default Post;
