const API_BASE_URL = "http://localhost:8080";

      const bookForm = document.getElementById("bookForm");
      const bookTableBody = document.getElementById("bookTableBody")
    
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
          description: bookFormData.get("description").trim() || null,
          language: bookFormData.get("language").trim(),
          pageCnt: bookFormData.get("pageCnt").trim(),
          publisher: bookFormData.get("publisher").trim(),
          coverImageUrl: bookFormData.get("coverImageUrl").trim(),
          edition: bookFormData.get("edition").trim(),
        };

        if(!validateBook(bookData)){
            return;
        }
    
        console.log(bookData);
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
    
        if (!book.publishDate) {
            alert("출판일을 입력해주세요.");
            return false;
        }

        if (!book.description) {
            alert("설명을 입력해주세요.");
            return false;
        }

        if (!book.language) {
            alert("언어를 입력해주세요.");
            return false;
        }

        if (!book.pageCnt) {
            alert("페이지 수를 입력해주세요.");
            return false;
        }

        if (!book.publisher) {
            alert("출판사를 입력해주세요.");
            return false;
        }

        if (!book.coverImageUrl) {
            alert("표지 이미지 URL을 입력해주세요.");
            return false;
        }

        if (!book.edition) {
            alert("개정판을 입력해주세요.");
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
        if (book.pageCnt && book.pageCnt < 0 ) {
            alert("올바른 페이지 수가 아닙니다.");
            return false;
        }
        if (book.edition && book.edition <= 0 ) {
            alert("올바른 개정판 형식이 아닙니다.");
            return false;
        }
    
        return true;
    }

      function loadBooks(){
        console.log("도서 목록 로드 중...")
      }