const API_BASE_URL = "http://localhost:8080";
let editingBookId = null;


const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody")
const cancelButton = bookForm.querySelector('.cancel-btn')
const submitButton = bookForm.querySelector('button[type = "submit"]')
const formError = document.getElementById("formError")

document.addEventListener("DOMContentLoaded", function(){
    loadBooks();
});

bookForm.addEventListener("submit", function(event){
    //기본으로 설정된 event가 작동하지 않도록
    event.preventDefault();
    console.log("Form 제출 되었음")

    const bookFormData = new FormData(bookForm);
    // bookFormData.forEach((value, key) => {
    //   console.log(key + " = " + value);
    // });

    const bookData = {
        title: bookFormData.get("title").trim(),
        author: bookFormData.get("author").trim(),
        isbn: bookFormData.get("isbn").trim(),
        price: bookFormData.get("price").trim(),
        publishDate: bookFormData.get("publishDate") || null,
        detailRequest:{
            description: bookFormData.get("description").trim() || null,
            language: bookFormData.get("language").trim(),
            pageCnt: bookFormData.get("pageCnt").trim(),
            publisher: bookFormData.get("publisher").trim(),
            coverImageUrl: bookFormData.get("coverImageUrl").trim(),
            edition: bookFormData.get("edition").trim(),
        }
    };

    if(!validateBook(bookData)){
        return;
    }

    if(editingBookId){
        updateBook(editingBookId,bookData);
    }else{
        createBook(bookData);
    }
});

function validateBook(book){
    if (!book.title) {
        alert("제목을 입력해주세요.");
        return false;
    }

    if (!book.author) {
        alert("저자를 입력해주세요.");
        return false;
    }

    if (!book.isbn) {
        alert("ISBN을 입력해주세요.");
        return false;
    }

    if (!book.price) {
        alert("가격을 입력해주세요.");
        return false;
    }

    if (!book.detailRequest.language) {
        alert("언어를 입력해주세요.");
        return false;
    }

    if (!book.detailRequest.publisher) {
        alert("출판사를 입력해주세요.");
        return false;
    }

    if (!book.detailRequest.coverImageUrl) {
        alert("표지 이미지 URL을 입력해주세요.");
        return false;
    }


    const isbnPattern = /^\d{13}$/;
    if (!isbnPattern.test(book.isbn)) {
        alert("올바른 isbn 형식이 아닙니다.");
        return false;
    }

    if (book.price && book.price < 0 ) {
        alert("올바른 가격이 아닙니다.");
        return false;
    }
    if (book.detailRequest.pageCnt && book.detailRequest.pageCnt < 0 ) {
        alert("올바른 페이지 수가 아닙니다.");
        return false;
    }

    return true;
}

function loadBooks(){
    console.log("도서 목록 로드 중...")
    fetch(`${API_BASE_URL}/api/books`) //Promise
        .then((response) => {
            if (!response.ok) {
                showError("도서 목록을 불러오는데 실패했습니다!");
            }
            return response.json();
        })
        .then((books) => renderBookTable(books))
        .catch((error) => {
            console.log("Error: " + error);
            showError("도서 목록을 불러오는데 실패했습니다!");
        });
}

function renderBookTable(books) {
    console.log(books);
    bookTableBody.innerHTML = "";

    books.forEach((book) => {
        //<tr> 엘리먼트를 생성하기
        const row = document.createElement("tr");
        
        //<tr>의 content을 동적으로 생성
        row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${book.price}</td>
                    <td>${book.publishDate}</td>
                    <td>${book.detail ? book.detail.description : "-"}</td>
                    <td>${book.detail ? book.detail.language : "-"}</td>
                    <td>${book.detail?.pageCnt ?? "-"}</td>
                    <td>${book.detail ? book.detail.publisher || "-" : "-"}</td>
                    <td>${book.detail?.coverImageUrl ?? "-"}</td>
                    <td>${book.detail?.edition ?? "-"}</td>
                    <td>
                        <button class="edit-btn" onclick="editBook(${book.id})">수정</button>
                        <button class="delete-btn" onclick="deleteBook(${book.id})">삭제</button>
                    </td>
                `;
        //<tbody>의 아래에 <tr>을 추가시켜 준다.
        bookTableBody.appendChild(row);
    });
}

function createBook(bookData){
    fetch(`${API_BASE_URL}/api/books`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(bookData)
    })
    .then(async(response) => {
        if(!response.ok){
            const errorData = await response.json();
            if(response.status === 409){  //더 자세히 비교
                throw new Error(errorData.message||"중복되는 정보가 있습니다.");
            }else{
                throw new Error(errorData.message||"도서 등록에 실패했습니다.")
            }
        }
        return response.json();
    })
    .then((result) => {
        showSuccess("도서가 성공적으로 등록되었습니다!");
        resetForm();
        loadBooks();
    })
    .catch((error) => {
        console.log("error: ",error);
        showError(error.message);
    });
}

function deleteBook(bookId){
    if(!confirm(`ID = ${bookId} 인 도서를 삭제하시겠습니까?`)){
        return;
    }
    fetch(`${API_BASE_URL}/api/books/${bookId}`,{
        method: 'DELETE'
    })
    .then(async(response) => {
        if(!response.ok){
            const errorData = await response.json();
            if(response.status === 404){
                throw new Error(errorData.message||"존재하지 않는 도서입니다.");
            }else{
                throw new Error(errorData.message||"도서 삭제에 실패했습니다.");
            }
        }
        showSuccess("도서가 성공적으로 삭제되었습니다!");
        loadBooks();
    })
    .catch((error) => {
        console.log("error: ",error);
        showError(error.message);
    });
}

function editBook(bookId){
    fetch(`${API_BASE_URL}/api/books/${bookId}`)
    .then(async(response) => {
        if(!response.ok){
            const errorData = await response.json();
            if(response.status === 404){ 
                throw new Error(errorData.message||"존재하지 않는 도서입니다.");
            }
        }
        return response.json();
    })
    .then((book) => {
        bookForm.title.value = book.title;
        bookForm.author.value = book.author;
        bookForm.isbn.value = book.isbn;
        bookForm.price.value = book.price;
        bookForm.publishDate.value = book.publishDate;
        if (book.detail) {
            bookForm.description.value = book.detail.description;
            bookForm.language.value = book.detail.language;
            bookForm.pageCnt.value = book.detail.pageCnt || '';
            bookForm.publisher.value = book.detail.publisher;
            bookForm.coverImageUrl.value = book.detail.coverImageUrl;
            bookForm.edition.value = book.detail.edition || '1st';
        }

        editingBookId = bookId;
        submitButton.textContent = "도서 수정";
        cancelButton.style.display='inline-block';
    })
    .catch((error) => {
        console.log("error: ",error);
        showError(error.message);
    });
}

function resetForm(){
    bookForm.reset();
    editingBookId = null;
    submitButton.textContent = "도서 등록"
    cancelButton.style.display = "none";
    clearMessages();
}

function updateBook(bookId, bookData){
    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(bookData)
    })
    .then(async(response) => {
        if(!response.ok){
            const errorData = await response.json();
            if(response.status === 409){  //더 자세히 비교
                throw new Error(errorData.message||"중복되는 정보가 있습니다.");
            }else{
                throw new Error(errorData.message||"도서 수정에 실패했습니다.")
            }
        }
        return response.json();
    })
    .then((result) => {
        showSuccess("도서가 성공적으로 수정되었습니다!");
        resetForm();
        loadBooks();
    })
    .catch((error) => {
        console.log("error: ",error);
        showError(error.message);
    });
}

//성공 메시지 출력
function showSuccess(message) {
    formError.textContent = message;
    formError.style.display = 'block';
    formError.style.color = '#28a745';
}
//에러 메시지 출력
function showError(message) {
    formError.textContent = message;
    formError.style.display = 'block';
    formError.style.color = '#dc3545';
}
//메시지 초기화
function clearMessages() {
    formError.style.display = 'none';
}