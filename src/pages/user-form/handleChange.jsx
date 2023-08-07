const HandleChange = (e, fn1, bool, fn2, error) => {
	fn1(e.target.value);
	setDef(bool, fn2, error);
}

const setDef = (bool, fn, error) => {
	fn({
		error: bool? false: true,
	})
}

export { HandleChange }