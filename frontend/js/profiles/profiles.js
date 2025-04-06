
document.getElementById('getDataBtn').addEventListener('click', function() {
    fetch('http://localhost:3000/api/example')
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = data.message;
        })
        .catch(error => console.error('Error:', error));
});
