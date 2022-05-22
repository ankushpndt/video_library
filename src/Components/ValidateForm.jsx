export const validateForm = ({ name, email, password, setErrorMessage }) => {
	if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
		setErrorMessage("Invalid Name. Must be at least 3 characters long.");
		return false;
	}

	if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(email)) {
		setErrorMessage("Invalid Email");
		return false;
	}
	if (!/^(?=.*?[a-zA-Z0-9]).{8,}$/i.test(password)) {
		setErrorMessage("Password must contain atleast 8 characters");
		return false;
	}
	setErrorMessage("");
	return true;
};
