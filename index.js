document.addEventListener('DOMContentLoaded', () => {
  const professionsContainer = document.getElementById('professions-container');
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  fetch('https://api.sampleapis.com/health/professions')
    .then(response => response.json())
    .then(data => {
      data.forEach(profession => {
        const professionCard = document.createElement('div');
        professionCard.classList.add('col-md-4', 'mb-4');

        professionCard.innerHTML = `
          <div class="profession-card h-100">
            <h5>${profession.long_name}</h5>
            <p><strong>Short Name:</strong> ${profession.short_name}</p>
                    </div>`;

        professionsContainer.appendChild(professionCard);
      });
    })
    .catch(error => {
      professionsContainer.innerHTML = '<p class="text-center text-danger">Failed to load professions. Please try again later.</p>';
      console.error('Error fetching professions:', error);
    });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
      formMessage.innerHTML = '<div class="alert alert-danger">Please fill in all fields.</div>';
      return;
    }

    formMessage.innerHTML = '<div class="alert alert-success">Thank you for your message! We will get back to you soon.</div>';
    contactForm.reset();
  });
});
document.getElementById("advanced-search-form").addEventListener("submit", function (e) {
 e.preventDefault() 
 const searchQuery = document.getElementById("search-input").value.toLowerCase().trim()

 fetch("https://api.sampleapis.com/health/professions")
  .then((response) => response.json())
  .then((data) => {
   const professionsContainer = document.getElementById("professions-container")
   professionsContainer.innerHTML = ""

   const filteredProfessions = data.filter((profession) => {
    const longName = profession.long_name.toLowerCase()
    const shortName = profession.short_name.toLowerCase()

    return longName.includes(searchQuery) || shortName.includes(searchQuery)
   })

   if (filteredProfessions.length > 0) {
    filteredProfessions.forEach((profession) => {
     const professionDiv = document.createElement("div")
     professionDiv.className = "profession"
     professionDiv.textContent = `${profession.long_name} (${profession.short_name})`
     professionsContainer.appendChild(professionDiv)
    })
   } else {
    // If no results, show a message
    const noResultsDiv = document.createElement("div")
    noResultsDiv.textContent = "No professions found"
    professionsContainer.appendChild(noResultsDiv)
   }
  })
  .catch((error) => {
   console.error("Error fetching data:", error)
  })
})


