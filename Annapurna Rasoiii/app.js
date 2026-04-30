/* ================= POPUP ================= */
function showPopup(message) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
        </div>
    `;

    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
    }, 1500);
}

/* ================= CART ================= */
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price,
        status: "Pending",
        payment: "Unpaid",
        time: new Date().toLocaleString()
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    showPopup("✅ Item added to cart!");
}

/* ================= GET CART ================= */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/* ================= CLEAR CART ================= */
function clearCart() {
    localStorage.removeItem("cart");
}

/* ================= RESERVATION ================= */
function submitReservation(form) {
    let name = form.querySelector("input[type='text']").value;
    let email = form.querySelector("input[type='email']").value;
    let phone = form.querySelector("input[type='tel']").value;
    let date = form.querySelector("input[type='date']").value;
    let guests = form.querySelector("input[type='number']").value;

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    reservations.push({
        name,
        email,
        phone,
        date,
        guests,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("reservations", JSON.stringify(reservations));

    form.reset();
    showPopup("🎉 Table Reserved Successfully!");
}

/* ================= REVIEWS ================= */
function submitReview() {
    let text = document.getElementById("reviewText").value.trim();
    let ratingInput = document.querySelector('input[name="star"]:checked');
    let rating = ratingInput ? ratingInput.value : 0;

    if (text === "") {
        alert("Please enter a review");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push({
        text: text,
        rating: Number(rating),
        time: new Date().toLocaleString()
    });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("reviewText").value = "";

    showReviews();
    showPopup("⭐ Review Submitted!");
}

/* ================= SHOW REVIEWS ================= */
function showReviews() {
    let reviewList = document.getElementById("reviewsList");
    if (!reviewList) return;

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviewList.innerHTML = "";

    reviews.forEach(r => {
        let li = document.createElement("li");
        li.textContent = `${r.text} (${r.rating}⭐)`;
        reviewList.appendChild(li);
    });
}

/* ================= CONTACT FORM ================= */
document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            showPopup("📩 Message Sent Successfully!");
            contactForm.reset();
        });
    }

    showReviews();
});

/* ================= ADMIN HELPERS ================= */
function getOrders() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function getReservations() {
    return JSON.parse(localStorage.getItem("reservations")) || [];
}

function getReviews() {
    return JSON.parse(localStorage.getItem("reviews")) || [];
}

/* ================= CLEAR ALL DATA ================= */
function clearAllData() {
    localStorage.clear();
    alert("All data cleared!");
}