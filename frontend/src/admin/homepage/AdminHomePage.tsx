import { useNavigate } from "react-router-dom";

export function AdminHomePage() {
	const navigate = useNavigate();

	const handleAdd = () => {
		navigate("/questions/add");
	};

	const handleDelete = () => {
		navigate("/questions/updateDelete");
	};

	return (
		<div>
			<div>
				<h2>Welcome, Admin</h2>
				<div style={{ display: 'flex', gap: '1rem' }}>
					<button onClick={handleAdd}>Add Questions</button>
					<button onClick={handleDelete}>Delete/Update Questions</button>
				</div>
			</div>
		</div>
	);
}

