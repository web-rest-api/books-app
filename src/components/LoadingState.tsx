type LoadingStateProps = {
	message?: string
	className?: string
}

const LoadingState = ({ message = "Loading…", className = "" }: LoadingStateProps) => (
	<div className={`text-center py-12 text-gray-500 ${className}`}>{message}</div>
)

export default LoadingState
