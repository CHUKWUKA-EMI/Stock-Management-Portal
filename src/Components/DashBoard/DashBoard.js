import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import { Icon } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
	table: {
		width: "100%",
	},
	root: {
		marginTop: "10rem",
		marginLeft: "20rem",
		width: "70%",
	},
	fab: {
		backgroundColor: "red",
		color: "white",
		"&:hover": {
			backgroundColor: "darkred",
			color: "white",
		},
	},
	text: {
		textTransform: "capitalize",
		fontWeight: "bold",
	},
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",

		//boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

export default function DashBoard() {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [data, setData] = React.useState([]);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const fetchData = async () => {
		try {
			const result = await fetch("http://127.0.0.1:8000/api/stocks/", {
				method: "GET",
				headers: {
					"content-Type": "Application/json",
				},
			});

			const res = await result.json();
			setData(res);
			console.log(data);
		} catch (err) {
			console.log(err.message);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const deleteHandler = async (itemId) => {
		try {
			const result = await fetch(
				`http://127.0.0.1:8000/api/stocks/${itemId}/`,
				{
					method: "DELETE",
					headers: {
						"content-Type": "Application/json",
					},
				}
			);

			const existingData = [...data];
			const newData = existingData.filter((item) => item.id !== itemId);
			setData(newData);
			console.log(itemId, newData);
		} catch (err) {
			console.log(err.message);
		}
	};

	const DeleteButton = (props) => {
		return (
			<Fab
				onClick={props.onDelete}
				size="small"
				variant="extended"
				className={classes.fab}>
				<span className={classes.text}>Delete</span>
			</Fab>
		);
	};

	return (
		<TableContainer className={classes.root} component={Paper}>
			<Table className={classes.table} size="medium" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography style={{ fontWeight: "bold" }} component="h3">
								Name
							</Typography>
						</TableCell>
						<TableCell align="center">
							<Typography style={{ fontWeight: "bold" }} component="h3">
								Current Price
							</Typography>
						</TableCell>
						<TableCell align="center">
							<Typography style={{ fontWeight: "bold" }} component="h3">
								Last Update
							</Typography>
						</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item) => (
						<TableRow
							style={{ width: "25px" }}
							hover
							role="checkbox"
							key={item.id}>
							<TableCell component="th" scope="row">
								{item.name}
							</TableCell>
							<TableCell contentEditable={true} align="center">
								${item.currentPrice}
							</TableCell>
							<TableCell align="center">{item.lastUpdate}</TableCell>
							<TableCell align="center">
								<Modal
									hideBackdrop
									open={open}
									onClose={handleClose}
									aria-labelledby="simple-modal-title"
									aria-describedby="simple-modal-description">
									<div style={modalStyle} className={classes.paper}>
										<p>
											Click on the delete button to confirm deletion.If you are
											not sure, you can click on the cancel button
										</p>
										<button
											type="button"
											onClick={() => {
												deleteHandler(item.id);
												handleClose();
											}}>
											Confirm Delete
										</button>{" "}
										<button onClick={() => handleClose()}>Cancel</button>
									</div>
								</Modal>
								<DeleteButton onDelete={handleOpen} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
