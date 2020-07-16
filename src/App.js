import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CreateStock from "./Components/CreateStock/CreateStock";
import NavBar from "./Components/NavBar/NavBar";
import DashBoard from "./Components/DashBoard/DashBoard";
import "./App.css";

function App() {
	const [form, setForm] = React.useState(true);
	const [dashboard, setDashboard] = React.useState(false);

	const renderForm = () => {
		setForm(true);
		setDashboard(false);
	};
	const renderDashboard = () => {
		setForm(false);
		setDashboard(true);
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Grid item xs={12}>
					<NavBar onClick={renderForm} onClick2={renderDashboard} />
				</Grid>
				<Grid item xs={12}>
					{form && <CreateStock />}
					{dashboard && <DashBoard />}
				</Grid>
			</Grid>
		</Grid>
	);
}

export default App;
