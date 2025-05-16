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
    // stuFormData.forEach((value, key) => {
    //     console.log(key + " = " + value);
    // });

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

    console.log(studentData);
}); 

function validateStudent(student){
    if (!student.name) {
        alert("이름을 입력해주세요.");
        return false;
    }

    if (!student.studentNumber) {
        alert("학번을 입력해주세요.");
        return false;
    }

    if (!student.address) {
        alert("주소를 입력해주세요.");
        return false;
    }

    if (!student.phoneNumber) {
        alert("전화번호를 입력해주세요.");
        return false;
    }

    if (!student.email) {
        alert("이메일을 입력해주세요.");
        return false;
    }
    // 학번 형식 검사 (예: 영문과 숫자 조합)
    //const studentNumberPattern = /^[A-Za-z0-9]+$/;
    const studentNumberPattern = /^s\d{5}$/;
    if (!studentNumberPattern.test(student.studentNumber)) {
        alert("학번은 영문과 숫자만 입력 가능합니다.");
        return false;
    }

    // 전화번호 형식 검사
    const phonePattern = /^[0-9-\s]+$/;
    if (!phonePattern.test(student.phoneNumber)) {
        alert("올바른 전화번호 형식이 아닙니다.");
        return false;
    }

    // 이메일 형식 검사 (입력된 경우에만)
    if (student.email && !isValidEmail(student.email)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return false;
    }

    return true;
}

function isValidEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function loadStudents() {
    console.log("학생 목록 로드 중...")
}