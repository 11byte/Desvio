document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-button');
    const popup = document.querySelector('.popup');
    const cancelButton = document.querySelector('.cancel-button');
    const submitButton = document.querySelector('.submit-button');
    const locationInput = document.querySelector('#location');
    const descriptionInput = document.querySelector('#description');
    const imageUploadInput = document.querySelector('#imageUpload');
    const bucketList = document.querySelector('#bucketList');

    // Open popup
    addButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    // Close popup
    cancelButton.addEventListener('click', () => {
        popup.classList.add('hidden');
        clearInputs();
    });

    // Add bucket list item
    submitButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        const description = descriptionInput.value.trim();
        const file = imageUploadInput.files[0];

        if (location && description && file) {
            
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageURL = e.target.result;

                // Check if the location already exists in the bucket list
                const existingLocation = Array.from(bucketList.querySelectorAll('.location'))
                    .find(item => item.innerText === location);

                if (!existingLocation) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="${imageURL}" alt="${location}">
                        <div class="location">${location}</div>
                        <div class="description">${description}</div>
                    `;

                    bucketList.appendChild(card);

                    // Close popup and clear inputs
                    popup.classList.add('hidden');
                    clearInputs();
                } else {
                    alert('This location is already in your bucket list!');
                }
            };

            reader.readAsDataURL(file);
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Clear form inputs
    function clearInputs() {
        locationInput.value = '';
        descriptionInput.value = '';
        imageUploadInput.value = '';
    }
});
