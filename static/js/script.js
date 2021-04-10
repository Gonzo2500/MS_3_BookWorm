$(document).ready(function () {
    $("#selectedTest").formSelect();
    $('.sidenav').sidenav({ edge: "right" });
    $('.tooltipped').tooltip();
});

// Add book modal
function startModalBooks() {
    const modal = document.querySelector(".modal-container")
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

// Event Listener that starts the add book modal
document.addEventListener('DOMContentLoaded', function () {
    const addBook = document.getElementById("add-book")
    if (addBook) {
        addBook.addEventListener("click", () => {
            startModalBooks()
        })
    }
})

// Event Listener that starts the edit book modal
document.addEventListener('DOMContentLoaded', function () {
    const editBook = document.getElementById("edit-book")
    if (editBook) {
        editBook.addEventListener("click", () => {
            startModalBooks()
        })
    }
})

// Delete Modal
function deleteModal() {
    const modal = document.querySelector(".delete")
    modal.classList.add("show-modal");

    modal.addEventListener("click", (e) => {
        if (e.target.id == "modal-delete" || e.target.className == "close-delete-modal" || e.target.id == "cancel-delete") {
            modal.classList.remove("show-modal")
        }
    })
}

// Event Listener that starts delete modal
document.addEventListener('DOMContentLoaded', function () {
    const deleteBook = document.getElementById("delete-book")
    if (deleteBook) {
        deleteBook.addEventListener("click", () => {
            deleteModal()
        })
    }
})