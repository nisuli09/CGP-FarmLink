
function showLogout() {
    document.getElementById("logoutModal").style.display = "flex";
  }
  
  function hideLogout() {
    document.getElementById("logoutModal").style.display = "none";
  }
  
  function confirmLogout() {
    alert("Logged out successfully!");
    hideLogout();
  }
  
  function toggleEdit(btn) {
    const card = btn.closest('.card');
    const spans = card.querySelectorAll('.details span');
    spans.forEach(span => {
      const value = span.textContent;
      const input = document.createElement('input');
      input.value = value;
      input.setAttribute('data-key', span.dataset.key);
      input.style.width = '80%';
      span.replaceWith(input);
    });
  }
  
  function saveProfile(button) {
    const card = button.closest('.card');
    const inputs = card.querySelectorAll('.details input');
    inputs.forEach(input => {
      const span = document.createElement('span');
      span.setAttribute('data-key', input.dataset.key);
      span.textContent = input.value;
      input.replaceWith(span);
    });
  }
  