document.getElementById('returns-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const orderNumber = document.getElementById('orderNumber').value.trim();
  const reason = document.getElementById('reason').value.trim();
  const accept = document.getElementById('acceptPolicy').checked;

  if (!accept) {
    alert('Please accept the policy before submitting.');
    return;
  }

  if (!fullName || !orderNumber || !reason) {
    alert('Please fill in all required fields.');
    return;
  }

  alert('Your return request has been submitted. We’ll review it and get back to you soon.');
  this.reset();
});

