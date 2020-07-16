import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
		fontSize: "25px",
		fontWeight: "bold",
	},
	gap: {
		width: "20px",
	},
	btn: {
		border: "1px solid white",
		"&:hover": {
			backgroundColor: "white",
			color: "darkblue",
		},
		"&:focus": {
			backgroundColor: "white",
			color: "darkblue",
		},
	},
}));

export default function NavBar(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Stocks
					</Typography>
					<Button
						onClick={props.onClick}
						className={classes.btn}
						color="inherit">
						Create Stock
					</Button>
					<div className={classes.gap}></div>
					<Button
						onClick={props.onClick2}
						className={classes.btn}
						color="inherit">
						Dashboard
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
