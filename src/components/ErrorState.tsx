type ErrorStateProps = {
	message: string
	retryLabel?: string
	onRetry?: () => void | Promise<void>
	className?: string
}

const ErrorState = ({
	message,
	retryLabel = "Try again",
	onRetry,
	className = "",
}: ErrorStateProps) => (
	<div className={`text-center py-12 text-gray-500 space-y-4 ${className}`}>
		<p>{message}</p>
		{onRetry && (
			<button
				type="button"
				onClick={() => {
					void onRetry()
				}}
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
			>
				{retryLabel}
			</button>
		)}
	</div>
)

export default ErrorState
