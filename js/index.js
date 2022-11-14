/* ###################### Class Templates to incorporate OOP concepts ############################ */
class changeVisuals {
    constructor() {
        this.colorPrimary = "#198754";
        this.colorSecondary = "#0d6efd";
        this.borderColorPrimary = "rgb(0, 219, 0)";
        this.borderColorSecondary = "blue";
        this.buttonPrimary = "btn-outline-success";
        this.buttonSecondary = "btn-outline-primary";
    }

    // setters:
    set setButtonPrimary(btn) {
        this.buttonPrimary = btn.toLowerCase();
    }

    set setButtonSecondary(btn) {
        this.ButtonSecondary = btn.toLowerCase();
    }

    set setColorPrimary(color) {
        this.colorPrimary = color.toLowerCase();
    }

    set setColorSecondary(color) {
        this.colorSecondary = color.toLowerCase();
    }

    set setBorderColorPrimary(color) {
        this.borderColorPrimary = color.toLowerCase();
    }

    set setBorderColorSecondary(color) {
        this.borderColorSecondary = color.toLowerCase();
    }

    // getters:
    get getButtonPrimary() {
        return this.buttonPrimary;
    }

    get getButtonSecondary() {
        return this.buttonSecondary;
    }

    get getColorPrimary() {
        return this.colorPrimary;
    }

    get getColorSecondary() {
        return this.colorSecondary;
    }

    get getBorderColorPrimary() {
        return this.borderColorPrimary;
    }

    get getBorderColorSecondary() {
        return this.borderColorSecondary;
    }
    

    toUpdateStyle() {
        document.getElementById("submit-button").classList.replace(this.buttonPrimary, this.buttonSecondary);
        document.getElementById("main-heading").style.borderColor = this.colorSecondary;
        document.getElementById("main-heading").style.backgroundColor = this.colorSecondary;
        document.querySelectorAll(".form-item").forEach((item) => item.style.borderColor = this.colorSecondary);
        document.styleSheets[1].cssRules[0].style.borderColor = this.borderColorSecondary;
        document.styleSheets[1].cssRules[1].style.borderColor = this.borderColorSecondary;
        document.querySelectorAll(".table-btns").forEach((item) => item.disabled = true);   

        document.querySelectorAll(".user_record").forEach((pItem) => {
            if(pItem.childNodes[0].innerText === userID) {
                let cItems = pItem.childNodes;
                for(let i = 1; i <= 5; i++) {
                    cItems[i].style.color = "#ffffff";
                    cItems[i].style.backgroundColor = this.colorSecondary;
                }
            }
        });
    }

    toInsertStyle() {
        document.getElementById("submit-button").classList.replace(this.buttonSecondary, this.buttonPrimary);
        document.getElementById("main-heading").style.borderColor = this.colorPrimary;
        document.getElementById("main-heading").style.backgroundColor = this.colorPrimary;
        document.querySelectorAll(".form-item").forEach((item) => item.style.borderColor = this.colorPrimary);
        document.styleSheets[1].cssRules[0].style.borderColor = this.borderColorPrimary;
        document.styleSheets[1].cssRules[1].style.borderColor = this.borderColorPrimary;
        document.querySelectorAll(".table-btns").forEach((item) => item.disabled = false);

        document.querySelectorAll(".user_record").forEach((pItem) => {
            if(pItem.childNodes[0].innerText === userID) {
                let cItems = pItem.childNodes;
                for(let i = 1; i <= 5; i++) {
                    cItems[i].style.color = "black";
                    cItems[i].style.backgroundColor = "#ffffff";
                }
            }
        });
    }
}
/* ############################################################################################################## */


// Global Declarations and inits:
var newID = 0;
var userID; // Not initialized because will use undefined as indicator to either insert or update.
let visuals = new changeVisuals();
visuals.setColorPrimary = "#ffc107";
visuals.setBorderColorPrimary = "#ffc107";
visuals.setButtonPrimary = "btn-outline-warning";


let submitData = function() {
    // Save values from input field for future manipulation.
    let fName = document.getElementById("fname").value;
    let lName = document.getElementById("lname").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email-id").value;
    let phone = document.getElementById("phone").value;

    // Perform length check to make sure we are not passing empty values to table.
    if(fName.length > 0 && lName.length > 0 && age.length > 0 && email.length > 0 && phone.length > 0) {
        // If userID is initialized, then its an update operation. Otherwise, insert operation.
        if(userID !== undefined) {
            updateUser(userID, fName, lName, age, email, phone);
            userID = undefined; // So that we default to insert operation next time.
        }
        else {
            insertTableRecord(newID, fName, lName, age, email, phone);
            newID++;
        }
    } else { /* highlightFalseEntries() */ }   
}


function insertTableRecord(id, fname, lname, age, email, phone) {
    let table = document.getElementById("records_table");
    let curr_row = table.insertRow(-1); // Add new row for user data at the bottom of table body.
    curr_row.classList.add("user_record"); // Give new user a class for future edit/delete operations.

    // Required operation because we want to hide the id from user:
    let curr_td = curr_row.insertCell(-1);
    curr_td.classList.add("user-id");

    // Populate newly created data cells with acquired data.
    curr_td.innerText = id; // Because we already have first td.
    curr_row.insertCell(-1).innerText = fname;
    curr_row.insertCell(-1).innerText = lname;
    curr_row.insertCell(-1).innerText = age;
    curr_row.insertCell(-1).innerText = email;
    curr_row.insertCell(-1).innerText = phone;

    // Insert Edit/Delete buttons at the bottom of newly inserted row.
    curr_td = curr_row.insertCell(-1);
    curr_td.classList.add("td-button");
    curr_td.innerHTML = "<input class='table-btns btn btn-outline-danger' type='button' value='DELETE' onclick='deleteUser(this)' />";
    curr_td = curr_row.insertCell(-1);
    curr_td.classList.add("td-button");
    curr_td.innerHTML = "<input class='table-btns btn btn-outline-primary' type='button' value='EDIT' onclick='editUser(this)' />";

    document.getElementById("registration_form").reset(); // Reset the form so that user can add more records.
}


function updateUser(id, fname, lname, age, email, phone) {
    let userDataRows = document.getElementsByClassName("user_record"); // Acquire list of all user rows from table body.

    for(let i = 0; i < userDataRows.length; i++)
    {
        // tr => td => value (set updated value for each td inside the required tr)
        if(userDataRows[i].childNodes[0].innerText === id) {
            userDataRows[i].childNodes[1].innerText = fname;
            userDataRows[i].childNodes[2].innerText = lname;
            userDataRows[i].childNodes[3].innerText = age;
            userDataRows[i].childNodes[4].innerText = email;
            userDataRows[i].childNodes[5].innerText = phone;
            break; // Successful updation of one user record at a time, so break.
        }
    }
    document.getElementById("submit-button").value = "Add User Record".toUpperCase(); // Update button value.
    document.getElementById("registration_form").reset(); // Reset the form so that user can add more records.
    visuals.toInsertStyle();
}


function deleteUser(clickedUser) {
    clickedUser.parentNode.parentNode.remove(); // input => td => tr (removes entire row)
}


function editUser(clickedUser) {
    userDataList = clickedUser.parentNode.parentNode.childNodes; // input => td => tr => td[] (got list of all child td present in current tr)

    // Initialize userID to ID of user whom we are editing and also indicate that the next operation will be an edit operation.
    userID = userDataList[0].innerText;

    // Set input fields with data of user to Edit.
    document.getElementById("fname").value = userDataList[1].innerText;
    document.getElementById("lname").value = userDataList[2].innerText;
    document.getElementById("age").value = userDataList[3].innerText;
    document.getElementById("email-id").value = userDataList[4].innerText;
    document.getElementById("phone").value = userDataList[5].innerText;

    // Change button value to indicate that this will be an edit operation.
    document.getElementById("submit-button").value = "Update User Record".toUpperCase(); // Update button value. 
    visuals.toUpdateStyle();
}
