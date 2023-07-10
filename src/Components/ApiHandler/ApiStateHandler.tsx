import Container from "@mui/material/Container";

interface IApiStateHandlerProps {
	isLoading: boolean;
	isError: boolean;
	children: JSX.Element;
}

const ApiStateHandler: React.FC<IApiStateHandlerProps> = ({
	isLoading,
	isError,
	children,
}: IApiStateHandlerProps): JSX.Element => {
	if (isError) {
		return (
			<>
				<Container maxWidth="sm" sx={{ paddingTop: "8rem" }}>
					<h1>Something went wrong!!</h1>
				</Container>
			</>
		);
	}
	return isLoading ? (
		<>
			<Container maxWidth="sm" sx={{ paddingTop: "8rem" }}>
				<h1>Loading....</h1>
			</Container>
		</>
	) : (
		children
	);
};

export default ApiStateHandler;
