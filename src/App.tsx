import { PaletteMode, ScopedCssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
	ReactElement,
	createContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import HeaderBar from "./Components/Header/header";
import { DarkMode, LightMode } from "./colorConstants";
import RouteContainer from "./routes/RouteContainer";
import { getLocalTheme, updateThemeLocalState } from "./utils/theme";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorContext = createContext({ toggleColor: () => {} });

const App = (): ReactElement => {
	const [mode, setMode] = useState("light");

	useEffect(() => {
		const theme = getLocalTheme();
		setMode(theme);
	}, [mode]);

	const colorMode = useMemo(
		() => ({
			toggleColor: () => {
				updateThemeLocalState();
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = createTheme({
		palette: {
			mode: mode as PaletteMode,
			...(mode === "light"
				? {
						background: {
							default: LightMode.background,
							// header: LightMode.headerBackground,
						},

						primary: {
							main: LightMode.primary,
						},
						typography: {
							primary: LightMode.typography.primary,
							secondary: LightMode.typography.secondary,
						},
						linecolor: LightMode.linecolor,
				  }
				: {
						background: {
							default: DarkMode.background,
							// header: DarkMode.headerBackground,
							// primary: "#121212",
							// secondary: "rgba(255, 255, 255, 0.08)",
						},
						primary: {
							main: DarkMode.primary,
						},
						typography: {
							primary: DarkMode.typography.primary,
							secondary: DarkMode.typography.secondary,
						},
						linecolor: DarkMode.linecolor,
				  }),
		},
	});

	return (
		<>
			<ColorContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<ScopedCssBaseline enableColorScheme>
						<Router>
							<HeaderBar />
							<RouteContainer />
							<Footer />
						</Router>
					</ScopedCssBaseline>
				</ThemeProvider>
			</ColorContext.Provider>
		</>
	);
};

export default App;
