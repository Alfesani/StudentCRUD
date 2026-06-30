// ===============================
// CHANGE THIS TO YOUR WEB APP URL
// ===============================
const API_URL ="https://script.google.com/macros/s/AKfycbwtGJbRVT49D4SBPuhonrw8hGESVvVV1g4qz_VO5d3EnklvOffRmxRwKVRC2m35nWZ_tw/exec";

const tbody = document.querySelector("#studentTable tbody");

const studentId = document.getElementById("studentId");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const course = document.getElementById("course");

const saveBtn = document.getElementById("saveBtn");
const search = document.getElementById("search");

let students = [];

// Load data when page opens
window.onload = function () {
    loadStudents();
};

// ======================
// READ
// ======================
async function loadStudents() {

    const response = await fetch(API_URL + "?action=read");
    students = await response.json();

    displayStudents(students);
}

// ======================
// DISPLAY TABLE
// ======================
function displayStudents(data) {

    tbody.innerHTML = "";

    data.forEach(student => {

        tbody.innerHTML += `
        <tr>

            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.course}</td>

            <td>

                <button class="editBtn"
                    onclick="editStudent('${student.id}')">
                    Edit
                </button>

                <button class="deleteBtn"
                    onclick="deleteStudent('${student.id}')">
                    Delete
                </button>

            </td>

        </tr>
        `;

    });

}

// ======================
// SAVE
// ======================
saveBtn.onclick = async function () {

    const student = {

        id: studentId.value,
        name: name.value,
        email: email.value,
        phone: phone.value,
        course: course.value

    };

    if (
        student.name == "" ||
        student.email == "" ||
        student.phone == "" ||
        student.course == ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    // UPDATE
	if (student.id !== "") {

    if (!confirm("Update this student?")) {
        return;
    }

}
    if (student.id != "") {

        await fetch(API_URL + "?action=update", {

            method: "POST",

            body: JSON.stringify(student)

        });

        alert("Student Updated");

    }

    // CREATE
    else {

        await fetch(API_URL + "?action=create", {

            method: "POST",

            body: JSON.stringify(student)

        });

        alert("Student Added");

    }

    clearForm();
    loadStudents();

};

// ======================
// EDIT
// ======================
function editStudent(id) {

    const student = students.find(s => s.id == id);

    studentId.value = student.id;
    name.value = student.name;
    email.value = student.email;
    phone.value = student.phone;
    course.value = student.course;

    saveBtn.innerText = "Update Student";

}

// ======================
// DELETE
// ======================
async function deleteStudent(id) {

    if (!confirm("Delete this student?"))
        return;

    await fetch(API_URL + "?action=delete", {

        method: "POST",

        body: JSON.stringify({
            id: id
        })

    });

    loadStudents();

}

// ======================
// CLEAR FORM
// ======================
function clearForm() {

    studentId.value = "";
    name.value = "";
    email.value = "";
    phone.value = "";
    course.value = "";

    saveBtn.innerText = "Save Student";

}

// ======================
// SEARCH
// ======================
search.onkeyup = function () {

    const keyword = this.value.toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword) ||
        student.phone.toLowerCase().includes(keyword) ||
        student.course.toLowerCase().includes(keyword)

    );

    displayStudents(filtered);

};