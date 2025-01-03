console.log("hello");

// Select the button
const btn = document.querySelector("button");

// Add event listener to the button
btn.addEventListener("click", async (e) => {
    alert("hello");
    e.preventDefault(); // Prevent form submission

    // Retrieve values from input fields
    const firstname = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    console.log("Sending POST request...");
    console.log("Form Data:", { firstname, lastname, username, password });

    try {
        // Send POST request to the server with the user data
        const res = await axios.post('/auth/signup', {
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password
        });

        // Log the response from the server
        console.log("Server Response:", res.data);
        alert("User registered successfully!");
    } catch (err) {
        // Handle any errors
        console.error(err);
        alert("Failed to register user. Please try again.");
    }
});
