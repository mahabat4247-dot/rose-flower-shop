document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (formFeedback) {
        formFeedback.textContent = "Thank you for reaching out! We will contact you shortly.";
      }

      contactForm.reset();
    });
  }
});
