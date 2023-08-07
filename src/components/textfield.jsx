import TextField from "@mui/material/TextField";

const Textfield = (props) => {
	return <TextField variant="outlined" type={props.type} label={props.label} 
	value={props.value} helperText={props.helperText} error={props.error} 
	required onChange={props.onChange} />;
}

export { Textfield }