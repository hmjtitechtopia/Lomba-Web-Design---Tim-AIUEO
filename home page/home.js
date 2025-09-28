document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const city = document.getElementById('city').value.trim();
      const message = document.getElementById('reviewMessage').value.trim();
      if (name && city && message) {
        const reviewList = document.querySelector('.review-list');
        if (reviewList) {
          const newReview = document.createElement('div');
          newReview.classList.add('review');
          newReview.innerHTML = `<div class="review-text"><p>"${message}"</p><span>- ${name}, ${city}</span></div>`;
          reviewList.appendChild(newReview);
        }
        this.reset();
      }
    });
  }

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
});
