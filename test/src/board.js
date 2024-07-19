import "../src/board.css";
const data = [
  {
    id: 1,
    title: "작성자가 쓴 제목 1",
    price: "999",
    imageUrl: "image1.jpg", // 이미지 URL
  },
  {
    id: 2,
    title: "작성자가 쓴 제목 2",
    price: "999",
    imageUrl: "image2.jpg",
  },
  {
    id: 3,
    title: "작성자가 쓴 제목 3",
    price: "999",
    imageUrl: "image3.jpg",
  },
  // 추가 데이터 넣기
];

// 게시물 항목 컴포넌트
const PostItem = ({ title, price, imageUrl }) => {
  return (
    <div className="post-item">
      <img src={imageUrl} alt={title} className="post-image" />
      <h3 className="post-title">{title}</h3>
      <p className="post-price">가격: {price}원</p>
    </div>
  );
};

//게시판 홈페이지
const Board = () => {
  return (
    <div className="post-board">
      <div className="top">
        <h2>게시판</h2>
        <input className="button" type="button" value="작성하기"></input>
      </div>
      <div className="line"></div>
      <div className="post-board-bottom">
        {data.map((post) => (
          <PostItem
            key={post.id}
            title={post.title}
            price={post.price}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
