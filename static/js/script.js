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

// Add list modal
function startModalEditList() {
    const modal = document.querySelector(".modal-container")
    modal.classList.add("show-modal");

    modal.addEventListener("click", (e) => {
        if (e.target.id == "modal-edit-list" || e.target.className == "close-modal") {
            modal.classList.remove("show-modal")
        }
    })
}

// Event listener that starts add list modal
document.addEventListener('DOMContentLoaded', function () {
    const editList = document.getElementById("edit-list")
    if (editList) {
        editList.addEventListener("click", () => {
            startModalEditList()
        })
    }
})

// Function to dynamically add input fields
//https://www.sanwebe.com/2013/03/addremove-input-fields-dynamically-with-jquery
$(document).ready(function () {
    let maxFields = 3; //maximum input boxes allowed
    let addButton = $(".add-field-button"); //Add button ID
    let inputs = $(".container-inputs")

    let x = 1; //initlal text box count
    $(addButton).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < maxFields) { //max input box allowed
            x++; //text box increment
            $(inputs).append('<div class="input-field col s12 add-vendor"><label for="vendor_url">Vendor URL:</label><input id="vendor_url" name="vendor_url" type="text" class="validate" minlength="5" maxlength="100" required><a href="#" class="remove_field btn-small">Remove</a></div>'); //add input box
        }
    });

    $(inputs).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});