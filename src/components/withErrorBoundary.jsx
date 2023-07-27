import { useState, useEffect } from 'react';

/*
	Error bounding component that logs any potential from wrapped 
	children
*/
const WithErrorBoundary = ({ children }) => {
	const [hasError, setHasError] = useState(false);
	const [errorInfo, setErrorInfo] = useState(null);

	useEffect(() => {
		const handleComponentError = (error, errorInfo) => {
			setHasError(true);
			setErrorInfo(errorInfo);
		};

		window.addEventListener('error', handleComponentError);

		return () => {
			window.removeEventListener('error', handleComponentError);
		}

	}, []);

	if (hasError) {
		return <h3 style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>Oops! Seems like something happened</h3>;
	}

	return <>{children}</>;
}

export { WithErrorBoundary };