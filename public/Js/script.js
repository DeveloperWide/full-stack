document.getElementById("listingForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
        this.submit(); // Submit the form if validation passes
    }
});

function validateForm() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let image = document.getElementById("image");
    let price = document.getElementById("price");
    let location = document.getElementById("location");
    let country = document.getElementById("country");

    let titleError = document.getElementById("titleError");
    let descriptionError = document.getElementById("descriptionError");
    let priceError = document.getElementById("priceError");
    let locationError = document.getElementById("locationError");
    let countryError = document.getElementById("countryError");

    let titleSuccess = document.getElementById("titleSuccess");
    let descriptionSuccess = document.getElementById("descriptionSuccess");
    let imageSuccess = document.getElementById("imageSuccess");
    let priceSuccess = document.getElementById("priceSuccess");
    let locationSuccess = document.getElementById("locationSuccess");
    let countrySuccess = document.getElementById("countrySuccess");

    let isValid = true;

    // Reset messages
    [titleError, descriptionError, priceError, locationError, countryError].forEach(el => el.style.display = "none");
    [titleSuccess, descriptionSuccess, priceSuccess, locationSuccess, countrySuccess].forEach(el => el.style.display = "none");

    // Validate Title
    if (title.value.trim().length < 10) {
        showError(title, titleError, "Title must be at least 10 characters!");
        isValid = false;
    } else {
        showSuccess(title, titleSuccess, "Valid Title!");
    }

    // Validate Description
    if (description.value.trim().length < 50) {
        showError(description, descriptionError, "Description must be at least 50 characters!");
        isValid = false;
    } else {
        showSuccess(description, descriptionSuccess, "Valid Description!");
    }

    // Validate Location
    if (location.value.trim().length === 0) {
        showError(location, locationError, "Please enter a valid location!");
        isValid = false;
    } else {
        showSuccess(location, locationSuccess, "Valid Location!");
    }

    // Validate Country
    if (country.value.trim().length === 0) {
        showError(country, countryError, "Please enter a valid country!");
        isValid = false;
    } else {
        showSuccess(country, countrySuccess, "Valid Country!");
    }

    // Validate Price
    if (isNaN(price.value) || price.value.trim().length === 0 || Number(price.value) <= 0) {
        showError(price, priceError, "Price must be a positive number!");
        isValid = false;
    } else {
        showSuccess(price, priceSuccess, "Valid Price!");
    }

    return isValid; // Return true if all fields are valid
}

function showError(input, errorElement, message) {
    input.style.borderColor = "red";
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function showSuccess(input, successElement, message) {
    input.style.borderColor = "green";
    successElement.textContent = message;
    successElement.style.display = "block";
}
