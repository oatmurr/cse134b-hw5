document.addEventListener("DOMContentLoaded", function () {
    // cet form elements
    const form = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const commentsTextarea = document.getElementById("comments");
    const errorOutput = document.getElementById("error-output");
    const infoOutput = document.getElementById("info-output");
    const currentCount = document.getElementById("current-count");
    const maxCount = document.getElementById("max-count");
    const charCountOutput = document.querySelector(".char-count");

    // array to track form errors
    let form_errors = [];

    // set up regex patterns for input validation
    const patterns = {
        name: /^[A-Za-z\s'-]+$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    };

    // initialise character counter
    const maxLength =
        parseInt(commentsTextarea.getAttribute("maxlength")) || 500;
    maxCount.textContent = maxLength;
    updateCharCount();

    // ---------- VALIDATION FUNCTIONS ----------

    // show error message with fade-out effect
    function showError(message, duration = 5000) {
        errorOutput.textContent = message;

        if (message) {
            errorOutput.style.display = "block";
            errorOutput.classList.remove("fade-out");
        }

        // clear any existing timeout
        if (errorOutput.fadeTimeout) {
            clearTimeout(errorOutput.fadeTimeout);
        }

        // set fade-out timeout
        errorOutput.fadeTimeout = setTimeout(() => {
            errorOutput.classList.add("fade-out");
            setTimeout(() => {
                errorOutput.style.display = "none";
                errorOutput.classList.remove("fade-out");
            }, 500); // duration of fade transition
        }, duration);
    }

    // show info message
    function showInfo(message, duration = 3000) {
        infoOutput.textContent = message;

        if (message) {
            infoOutput.style.display = "block";
            infoOutput.classList.remove("fade-out");
        }

        if (infoOutput.fadeTimeout) {
            clearTimeout(infoOutput.fadeTimeout);
        }

        infoOutput.fadeTimeout = setTimeout(() => {
            infoOutput.classList.add("fade-out");
            setTimeout(() => {
                infoOutput.style.display = "none";
                infoOutput.classList.remove("fade-out");
            }, 500); // duration of fade transition
        }, duration);
    }

    // log an error to the form_errors array
    function logError(field, type, message, value) {
        const error = {
            field: field,
            type: type,
            message: message,
            value: value,
            timestamp: new Date().toISOString(),
        };

        form_errors.push(error);

        // create hidden input or update existing one
        let formErrorsInput = document.getElementById("form-errors");
        if (!formErrorsInput) {
            formErrorsInput = document.createElement("input");
            formErrorsInput.type = "hidden";
            formErrorsInput.id = "form-errors";
            formErrorsInput.name = "form-errors";
            form.appendChild(formErrorsInput);
        }

        formErrorsInput.value = JSON.stringify(form_errors);
    }

    // visual indication of error
    function flashField(field) {
        field.classList.add("invalid-input");
        setTimeout(() => {
            field.classList.remove("invalid-input");
        }, 300);
    }

    // update character count for textarea
    function updateCharCount() {
        const currentLength = commentsTextarea.value.length;
        const remaining = maxLength - currentLength;
        currentCount.textContent = currentLength;

        // update styling based on how close to limit
        const percentFull = (currentLength / maxLength) * 100;

        if (percentFull >= 90) {
            charCountOutput.className = "char-count danger";
        } else if (percentFull >= 75) {
            charCountOutput.className = "char-count warning";
        } else {
            charCountOutput.className = "char-count";
        }

        // show info about remaining characters
        if (percentFull >= 75) {
            showInfo(`You have ${remaining} characters remaining`);
        }
    }

    // ---------- INPUT MASKING & VALIDATION ----------

    // name input validation and masking
    nameInput.addEventListener("input", function (e) {
        const value = this.value;
        const lastChar = value.charAt(value.length - 1);

        // check if the last character is valid
        if (value && lastChar && !patterns.name.test(lastChar)) {
            // remove the invalid character
            this.value = value.slice(0, -1);

            // visual feedback
            flashField(this);

            // show error message
            showError(`Invalid character "${lastChar}" not allowed in name`);

            // log the error
            logError(
                "name",
                "invalid_character",
                `Invalid character "${lastChar}" in name field`,
                value
            );
        }

        // use Constraint Validation API to set custom validity
        if (value && !patterns.name.test(value)) {
            this.setCustomValidity(
                "Name can only contain letters, spaces, hyphens, and apostrophes"
            );
        } else if (value.length < 2 && value.length > 0) {
            this.setCustomValidity("Name must be at least 2 characters long");
        } else {
            this.setCustomValidity("");
        }
    });

    // email input validation
    emailInput.addEventListener("input", function () {
        const value = this.value;

        // use Constraint Validation API
        if (value && !patterns.email.test(value)) {
            this.setCustomValidity("Please enter a valid email address");
        } else {
            this.setCustomValidity("");
        }
    });

    // comments textarea validation and character counting
    commentsTextarea.addEventListener("input", function () {
        const value = this.value;
        updateCharCount();

        // check for min/max length
        if (value.length > 0 && value.length < 10) {
            this.setCustomValidity(
                "Comments must be at least 10 characters long"
            );
        } else if (value.length > maxLength) {
            // trim to max length
            this.value = value.substring(0, maxLength);
            this.setCustomValidity(
                "You have exceeded the maximum character limit"
            );

            // log error
            logError(
                "comments",
                "max_length",
                "Exceeded maximum character limit",
                value
            );

            // show error
            showError(`Maximum ${maxLength} characters allowed`);

            // update count after trimming
            updateCharCount();
        } else {
            this.setCustomValidity("");
        }
    });

    // ---------- FORM SUBMISSION ----------

    // validate all fields before submission
    form.addEventListener("submit", function (e) {
        let isValid = true;

        // check name field
        if (!nameInput.value.trim()) {
            nameInput.setCustomValidity("Name is required");
            isValid = false;
            logError("name", "required", "Name field is required", "");
        } else if (!patterns.name.test(nameInput.value)) {
            nameInput.setCustomValidity("Name contains invalid characters");
            isValid = false;
            logError(
                "name",
                "invalid_format",
                "Name contains invalid characters",
                nameInput.value
            );
        } else if (nameInput.value.length < 2) {
            nameInput.setCustomValidity(
                "Name must be at least 2 characters long"
            );
            isValid = false;
            logError("name", "too_short", "Name is too short", nameInput.value);
        } else {
            nameInput.setCustomValidity("");
        }

        // check email field
        if (!emailInput.value.trim()) {
            emailInput.setCustomValidity("Email is required");
            isValid = false;
            logError("email", "required", "Email field is required", "");
        } else if (!patterns.email.test(emailInput.value)) {
            emailInput.setCustomValidity("Please enter a valid email address");
            isValid = false;
            logError(
                "email",
                "invalid_format",
                "Invalid email format",
                emailInput.value
            );
        } else {
            emailInput.setCustomValidity("");
        }

        // check comments if filled out (optional)
        if (
            commentsTextarea.value.trim() &&
            commentsTextarea.value.length < 10
        ) {
            commentsTextarea.setCustomValidity(
                "Comments must be at least 10 characters long"
            );
            isValid = false;
            logError(
                "comments",
                "too_short",
                "Comments too short",
                commentsTextarea.value
            );
        } else {
            commentsTextarea.setCustomValidity("");
        }

        // run checkValidity() to report validation to browser
        if (!form.checkValidity() || !isValid) {
            e.preventDefault();

            // show overall form error
            showError(
                "Please correct the errors in the form before submitting"
            );

            // report the first field with an error
            const invalidFields = form.querySelectorAll(":invalid");
            if (invalidFields.length > 0) {
                invalidFields[0].focus();
                flashField(invalidFields[0]);
            }
        } else {
            // form is valid
            showInfo("Form is valid! Submitting...");
        }
    });

    // blur event handlers for real-time validation feedback
    nameInput.addEventListener("blur", function () {
        if (!this.validity.valid) {
            flashField(this);
            showError(this.validationMessage);
        }
    });

    emailInput.addEventListener("blur", function () {
        if (!this.validity.valid) {
            flashField(this);
            showError(this.validationMessage);
        }
    });

    commentsTextarea.addEventListener("blur", function () {
        if (!this.validity.valid) {
            flashField(this);
            showError(this.validationMessage);
        }
    });
});
