const API_BASE_URL = "http://localhost:8080";

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody")

document.addEventListener("DOMContentLoaded", function () {
    loadStudents();
});

studentForm.addEventListener("submit", function (event) {
    //기본으로 설정된 event가 작동하지 않도록
    event.preventDefault();
    console.log("Form 제출 되었음")

    const stuFormData = new FormData(studentForm);
    stuFormData.forEach((value, key) => {
        console.log(key + " = " + value);
    });

    const studentData = {
        name: stuFormData.get("name").trim(),
        studentNumber: stuFormData.get("studentNumber").trim(),
        address: stuFormData.get("address").trim(),
        phoneNumber: stuFormData.get("phoneNumber").trim(),
        email: stuFormData.get("email").trim(),
        dateOfBirth: stuFormData.get("dateOfBirth"),
    };

    if(!validateStudent(studentData)){
        return;
    }
}); 

function validateStudent(){

}

function isValidEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function loadStudents() {
    console.log("학생 목록 로드 중...")
}