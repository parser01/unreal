import { useParams } from "react-router-dom";

const PostPage = (): JSX.Element => {
	console.log(useParams());
	const { title } = useParams();

	return <>{title}</>;
};

export default PostPage;
