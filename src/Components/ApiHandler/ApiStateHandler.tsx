import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
			<Box sx={{ paddingTop: "20%", paddingBottom: "25%", textAlign: "center" }}>
      <CircularProgress />
    </Box>
		</>
	) : (
		children
	);
};

export default ApiStateHandler;
