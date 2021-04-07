$(document).ready(function () {
    $('.sidenav').sidenav({ edge: "right" });
});

// Add book modal
function startModalBooks() {
    const modal = document.querySelector(".container-modal")
    modal.classList.add("show-modal");

    modal.addEventListener("click", (e) => {
        if (e.target.id == "modal-review" || e.target.className == "close-modal") {
            modal.classList.remove("show-modal")
        }
    })
}

// Event Listener that starts the add book modal
document.addEventListener('DOMContentLoaded', function () {
    const addBook = document.getElementById("book-add")
    if (addBook) {
        addBook.addEventListener("click", () => {
            startModalBooks()
        })
    }
})
