import styled from "styled-components";
import Post from "./Post";
// import { posts } from "../data";
import { useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";
import { IPost } from "../types/post";
import { useScroll } from "../hooks/useScroll";
import Loader from "./UI/Loader";

export interface IPostsProps {
	searchValue: string;
}

const StyledPosts = styled.div`
	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
		gap: 60px;
	}

	.io-target {
		height: 0;
	}

	.loader-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 30px;

		&.first-loading {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			width: 80px;
			height: 80px;
			margin: auto;
		}
	}
`;

const Posts = ({ searchValue }: IPostsProps): JSX.Element => {
	const [posts, setPosts] = useState<IPost[] | []>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalCount, setTotalCount] = useState<number | null>(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [loadingCount, setLoadingCount] = useState(0);
	const ioTargetRef = useRef<HTMLDivElement>(null);

	const fetchPosts = useCallback(async () => {
		if (totalCount !== null && posts.length === totalCount) {
			return;
		}

		setIsLoading(true);
		setLoadingCount((loadingCount) => loadingCount + 1);

		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
			);
			// setPosts((actual) => [...actual, ...response.data]);
			setPosts([...posts, ...response.data]);
			setCurrentPage((actual) => actual + 1);
			setTotalCount(+response.headers["x-total-count"]);
		} catch {
			setError("Error occured!");
		} finally {
			setIsLoading(false);
		}
	}, [currentPage, posts, totalCount]);

	useScroll(null, ioTargetRef, fetchPosts);

	const filteredPosts = useMemo(
		() =>
			posts.filter((post) =>
				post.title.toLowerCase().includes(searchValue.toLowerCase())
			),
		[posts, searchValue]
	);

	return (
		<StyledPosts>
			<div className="posts">
				{filteredPosts.map(({ id, title, date, body }) => (
					<Post
						key={id}
						id={id}
						title={title}
						date={String(id)}
						body={body}
						// image={image}
					/>
				))}
			</div>

			<div className="io-target" ref={ioTargetRef}></div>
			{isLoading ? (
				<div
					className={
						loadingCount === 1
							? "loader-wrapper first-loading"
							: "loader-wrapper"
					}
				>
					<Loader color="#3861fb" />
				</div>
			) : null}
		</StyledPosts>
	);
};

export default Posts;
