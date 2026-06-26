// Search index containing page titles, keywords, and target URLs for the search bar

//
//got this ffrom videos

const siteIndex = [
    { title: "Table Mountain (Attraction)", keywords: "things to do views mountain cableway hike", url: "thingsToDo.html" },
    { title: "V&A Waterfront (Attraction)", keywords: "things to do shopping dining waterfront entertainment", url: "thingsToDo.html" },
    { title: "Robben Island (Attraction)", keywords: "things to do history nelson mandela prison island", url: "thingsToDo.html" },
    { title: "Cape Winelands (Activity)", keywords: "outdoor hiking trails vineyards wine tasting hike", url: "thingsToDo.html" },
    { title: "Shark Cage Diving (Activity)", keywords: "outdoor adventure shark diving adrenaline ocean", url: "thingsToDo.html" },
    { title: "Clifton & Camps Bay (Beaches)", keywords: "outdoor beaches relax clifton camps bay sea", url: "thingsToDo.html" },
    { title: "Bo-Kaap (Culture)", keywords: "cultural painted houses cape malay cooking heritage", url: "thingsToDo.html" },
    { title: "Artscape Theatre (Culture)", keywords: "cultural performance opera ballet plays performing arts", url: "thingsToDo.html" },
    { title: "City Developments (News)", keywords: "news infrastructure transportation public spaces myciti", url: "news.html" },
    { title: "Eco-Friendly Initiatives (News)", keywords: "news solar streetlights recycling sustainability green", url: "news.html" },
    { title: "Water-Saving Campaigns (News)", keywords: "news greywater systems rainwater harvesting resources", url: "news.html" },
    { title: "International Jazz Festival (Events)", keywords: "news festivals jazz artists music convention centre", url: "news.html" },
    { title: "Food and Wine Festival (Events)", keywords: "news festivals food wine tasting local cuisine", url: "news.html" },
    { title: "Summer Outdoor Markets (Events)", keywords: "news markets greenmarket square oranjezicht vendors", url: "news.html" },
    { title: "Beach Clean-Ups (Community)", keywords: "news community beach clean muizenberg camps bay volunteers", url: "news.html" },
    { title: "Cape Town Art Scene (Community)", keywords: "news community art galleries exhibitions woodstock contemporary", url: "news.html" },
    { title: "Youth Programs (Community)", keywords: "news community youth skills training coding entrepreneurship", url: "news.html" },
    { title: "Our Story & Background", keywords: "about us digital publication culture lifestyle history online project", url: "aboutUs.html" },
    { title: "Our Vision & Mission", keywords: "about us vision online guide guide hidden gems local entrepreneurs", url: "aboutUs.html" },
    { title: "Magazine Readership Profile", keywords: "about us audience newsletter subscribers updates target", url: "aboutUs.html" },
    { title: "Contact Information & Office", keywords: "contact us email phone address office bree street", url: "contactUS.html" },
    { title: "Social Media Channels", keywords: "contact us facebook instagram x twitter links profiles connect", url: "contactUS.html" },
    { title: "Interactive Guide Map", keywords: "contact us map google location old foundry coordinates find", url: "contactUS.html" },
    { title: "Membership Subscription Form", keywords: "membership sign up register subscribe join form newsletter", url: "membershipForm.html" }
];

// Handles client-side form validation on submit
function validationOfForm(event) {
    // Stops the browser from reloading the page automatically
    event.preventDefault(); 
    
    // Removes any existing validation error messages from the screen
    document.querySelectorAll(".error-message").forEach(el => el.remove());

    let isValid = true;
    const form = event.target;
    const fields = ["name", "email", "feedback", "password", "dob"];
    
    // Iterates through each required field to check for empty values
    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (!input || input.value.trim() === "") {
            showError(input, `${fieldId} is required`);
            isValid = false;
        } else if (fieldId === "email" && !validateEmail(input.value)) {
            showError(input, "Please enter a valid email address");
            isValid = false;
        }
    });

    // If all validations pass, activates submit process
    if (isValid) {
        simulateAJAXSubmit(form);
    }
}

// Generates visual error indicators and puts text below the invalid field
function showError(inputElement, message) {
    inputElement.style.border = "2px solid #ff4d4d";
    
    const errorDisplay = document.createElement("span");
    errorDisplay.className = "error-message";
    errorDisplay.style.color = "#ff4d4d";
    errorDisplay.style.fontSize = "12px";
    errorDisplay.style.display = "block";
    errorDisplay.style.marginTop = "5px";
    errorDisplay.textContent = message;
    
    inputElement.parentNode.appendChild(errorDisplay);
}

// Evaluates an email format using a regular expression pattern
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simulates sending data  before changing pages
function simulateAJAXSubmit(formElement) {
    const submitBtn = formElement.querySelector("button") || formElement.querySelector("input[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending securely...";
    submitBtn.disabled = true;

    // puases for like 1.5 secs to act like the real servers
    setTimeout(() => {
        formElement.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        window.location.href = "thanks.html";
    }, 1500); 
}

// Initializes interactive scripts once the HTML document is fully parsed
document.addEventListener("DOMContentLoaded", function() {
    // Hooks the validation logic onto the subscription form if it exists on the page
    const membershipForm = document.querySelector("form");
    if (membershipForm) {
        membershipForm.addEventListener("submit", validationOfForm);
    }

    // Creates and configures the custom URL hover tracking element
    let statusBar = document.createElement("div");
    statusBar.id = "custom-status-bar";
    document.body.appendChild(statusBar);

    // Displays the destination URL at the bottom whenever a link is hovered
    let links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("mouseover", function() {
            statusBar.textContent = this.href;
            statusBar.style.display = "block";
        });
        link.addEventListener("mouseout", function() {
            statusBar.style.display = "none";
        });
    });

    // References the search engine wrapper elements
    let searchContainer = document.querySelector(".search-container");
    let searchInput = document.getElementById("search-input");
    
    // Builds and manages the live-filtering search box interface
    if (searchContainer && searchInput) {
        let dropdown = document.createElement("div");
        dropdown.id = "search-results-dropdown";
        searchContainer.appendChild(dropdown);

        // Filters matching pages in real-time as the user types character inputs
        searchInput.addEventListener("input", function() {
            let value = searchInput.value.toLowerCase().trim();
            dropdown.innerHTML = "";

            if (value === "") {
                dropdown.style.display = "none";
                return;
            }

            // Checks both titles and keywords for phrase matches
            let matches = siteIndex.filter(item => 
                item.title.toLowerCase().includes(value) || 
                item.keywords.toLowerCase().includes(value)
            );

            // Populates the dropdown container with clickable result links
            if (matches.length > 0) {
                matches.forEach(match => {
                    let itemDiv = document.createElement("div");
                    itemDiv.className = "search-result-item";
                    itemDiv.textContent = match.title;
                    itemDiv.addEventListener("click", function() {
                        window.location.href = match.url;
                    });
                    dropdown.appendChild(itemDiv);
                });
            } else {
                let noResultDiv = document.createElement("div");
                noResultDiv.className = "no-results-item";
                noResultDiv.textContent = "No matches found";
                dropdown.appendChild(noResultDiv);
            }

            dropdown.style.display = "block";
        });

        // Hides the dropdown suggestion panel if the user clicks anywhere else
        document.addEventListener("click", function(e) {
            if (!searchContainer.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });
    }

    // Gathers content image instances to set up the lightbox modal feature
    const images = document.querySelectorAll(".site-item img");
    if (images.length > 0) {
        // Generates the overlay background wrapper dynamically
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.style.cssText = "position:fixed; z-index:10000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:none; justify-content:center; align-items:center; cursor:pointer; opacity:0; transition:opacity 0.3s ease;";
        
        // Generates the image container layer inside the modal
        const lightboxImg = document.createElement("img");
        lightboxImg.style.cssText = "max-width:85%; max-height:85%; border: 3px solid white; border-radius:4px; box-shadow: 0px 0px 20px rgba(0,0,0,0.5);";
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        // standard image components to open inside the modal view upon interaction
        images.forEach(img => {
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.style.display = "flex";
                setTimeout(() => lightbox.style.opacity = "1", 10);
            });
        });

        // Minimizes and conceals the modal layout view when clicked
        lightbox.addEventListener("click", () => {
            lightbox.style.opacity = "0";
            setTimeout(() => lightbox.style.display = "none", 300);
        });
    }
});
