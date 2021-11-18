window.onload = function foo() {
	console.log('page just loaded');
	createData();
}

$('#cta').on('click', () => updateData());

function createData() {
	axios.put('/api/events', { value: 0 })
		.catch( err => console.log(err));
}

function updateData() {
	axios.put('/api/events', { value: 1 })
		.catch( err => console.log(err));
}
