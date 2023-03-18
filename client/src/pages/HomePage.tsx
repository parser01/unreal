import Posts, { IPostsProps } from "../components/Posts";

interface IHomePageProps extends IPostsProps {}

const HomePage = ({ searchValue }: IHomePageProps): JSX.Element => {
	return (
		<>
			<Posts searchValue={searchValue} />
		</>
	);
};

export default HomePage;
