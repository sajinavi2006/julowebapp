const Clipboard = {
	copy: (value) => {
		return navigator.clipboard.writeText(value);
	},
};

export default Clipboard;