* step1 - html page 작성
* step2 - form 내부의 input 과 table 에 CSS 추가
* step3
    - form.css파일로 분리하기
    - form 내부의 input 에 form-group, form-grid CSS 추가
* step4
    - javascript 코드 작성하기 시작
    - Form Load Event 핸들링 하기
    - Form  Submit Event 핸들링 하기
    - 사용자가 입력한 데이터를 Form Data에 저장하기
* step5
    - javascript code를 form.js 파일로 분리하기
    - 입력한 데이터를 검증하는 validate() 함수 구현하기
* step6
    - GET /api/students 서버와 통신하는 loadStudents() 구현 fetch 함수사용
    - renderStudentTable() 구현 table에 목록을 동적으로 출력하기
* step7
    - studentData 객체 구조 변경하기 및 validate() 함수 수정
    - POST api/students 서버와 통신하는 createStudent() 함수 구현
* step8
    - DELETE /api/students/1 서버와 통신하는 deleteStudent() 함수 구현
* step9
    - 수정,삭제 버튼의 스타일 추가하기
    - student 수정하기 전에 데이터 조회 먼저하기
    - GET api/students/1 student 조회하는 editStudent() 함수 구현
    - 수정 모드일때 취소 버튼 보여주고, resetForm() 함수 구현하고 연결하기
    - PUT api/students/1 student 수정하는 updateStudent() 함수 구현
* step10
    - 성공 및 실패 메시지를 alert() 대신 formError 에 보여주기
    - showSuccess() / showError() / clearMessages() 함수추가
    - loadStudents() 목록 불러오기 실패한 경우에 처리