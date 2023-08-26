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
		return (
			<div>
				<h3 style={{color: 'red', fontWeight: 'bold', textAlign: 'center'}}>
					Oops! Seems like something happened
				</h3>
				<h5 style={{textAlign: 'center'}}>REFRESH after a few minutes</h5>
			</div>
			);
	}

	return <>{children}</>;
}

export { WithErrorBoundary };