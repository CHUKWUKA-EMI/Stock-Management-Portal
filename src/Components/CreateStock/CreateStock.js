import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(15),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},

	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		height: "40px",
		borderRadius: "2rem",
		fontSize: "20px",
		fontWeight: "semi-bold",
	},
}));

export default function CreateStock() {
	const classes = useStyles();

	const [stockName, setStockName] = React.useState("");
	const [currentPrice, setCurrentPrice] = React.useState("");

	const payload = {
		stockName,
		currentPrice,
	};

	const createStock = async () => {
		try {
			const data = await fetch("http://127.0.0.1:8000/api/stocks/", {
				method: "POST",
				body: JSON.stringify(payload),
				headers: {
					"content-Type": "application/json",
				},
			});
			const result = await data.json();

			console.log(result);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography
					style={{ fontWeight: "bold", color: "grey" }}
					component="h1"
					variant="h5">
					Create Stock
				</Typography>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						createStock();
					}}
					className={classes.form}
					noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="stockName"
						label="stock name"
						name="stockName"
						value={stockName}
						onChange={(e) => {
							setStockName(e.target.value);
							console.log(e.target.value);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="currentPrice"
						value={currentPrice}
						onChange={(e) => setCurrentPrice(e.target.value)}
						label="Current Price"
						type="number"
						id="currentPrice"
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Submit
					</Button>
				</form>
			</div>
		</Container>
	);
}
