import { useState } from "react";
import axios from "axios";
import "./book.css";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
const RESULTS_PER_PAGE = 12; // 페이지 당 결과 수
const MAX_PAGE_BUTTONS = 10; // 한 번에 보여줄 최대 페이지 버튼 수

function Book() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [pageRange, setPageRange] = useState([1, MAX_PAGE_BUTTONS]); // 페이지 범위

  const searchBooks = async (query, page) => {
    const url = `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}&size=${RESULTS_PER_PAGE}`; //공통 요청 경로 지정
    const config = {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`, // 공통으로 요청할 헤더
      },
    };

    try {
      const response = await axios.get(url, config);
      setTotalPages(
        Math.ceil(response.data.meta.pageable_count / RESULTS_PER_PAGE)
      );
      return response.data.documents;
    } catch (error) {
      console.error("Error fetching data from Kakao API", error);
      return [];
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchBooks(query);
    setBooks(results);
  };

  const handlePageChange = async (newPage) => {
    setPage(newPage);
    const results = await searchBooks(query, newPage);
    setBooks(results);
  };

  const handlePrevPageRange = () => {
    setPageRange([
      Math.max(pageRange[0] - MAX_PAGE_BUTTONS, 1),
      Math.max(pageRange[1] - MAX_PAGE_BUTTONS, MAX_PAGE_BUTTONS),
    ]);
  };

  const handleNextPageRange = () => {
    setPageRange([
      Math.min(
        pageRange[0] + MAX_PAGE_BUTTONS,
        totalPages - MAX_PAGE_BUTTONS + 1
      ),
      Math.min(pageRange[1] + MAX_PAGE_BUTTONS, totalPages),
    ]);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = pageRange[0]; i <= Math.min(pageRange[1], totalPages); i++) {
      buttons.push(
        <button
          key={i}
          className={`page-button ${page === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  return (
    <div className="book">
      <h2>책 검색하기</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="책 제목을 검색해주세요"
        />
        <button type="submit" className="searchbtn">
          검색
        </button>
      </form>
      <div className="book-list">
        {books.length > 0 && (
          <ul>
            {books.map((book) => (
              <li key={book.isbn} className="book-item">
                <img src={book.thumbnail} alt={book.title} />
                <h3>{book.title}</h3>
                <p>저자: {book.authors.join(", ")}</p>
                <p>가격: {book.price.toLocaleString()}원 </p>
                <p>출판사: {book.publisher}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {books.length > 0 && (
        <div className="pagination">
          {pageRange[0] > 1 && (
            <button onClick={handlePrevPageRange} className="page-button">
              이전
            </button>
          )}
          {renderPageButtons()}
          {pageRange[1] < totalPages && (
            <button onClick={handleNextPageRange} className="page-button">
              다음
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Book;
