// app/components/CaseEvaluationForm/ThankYouMessage.js

export default function ThankYouMessage({ submittedData }) {
	return (
		<div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10 text-black">
			<h2 className="text-2xl font-bold mb-4 text-center font-fancy">Thank You!</h2>
			<p className="text-md mb-4 text-center">
				We have received your case evaluation request. Our team will review your
				information and get back to you as soon as possible.
			</p>
			<div className="bg-gray-100 p-6 rounded-lg shadow-md font-body">
				<h3 className="text-xl font-semibold mb-3">Submitted Information:</h3>
				<ul className="space-y-2 list-none">
					<li>
						<strong>Full Name:</strong> {submittedData.fullName}
					</li>
					<li>
						<strong>Email:</strong> {submittedData.email}
					</li>
					<li>
						<strong>Phone:</strong> {submittedData.phone}
					</li>
					<li>
						<strong>County:</strong> {submittedData.county}
					</li>
					<li>
						<strong>Case Description:</strong>
						<p className="mt-1 text-sm text-gray-800">
							{submittedData.caseDescription}
						</p>
					</li>
				</ul>
			</div>
			<p className="text-md text-gray-600 mt-4 text-center">
				If you have any urgent questions or need to make changes to your
				submission, please don&apos;t hesitate to contact us directly.
			</p>
		</div>
	);
}
