import "../src/write.css";
import React, { useState } from "react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  //--임시방편으로 --
  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 로직 작성
    console.log({ title, price, content, files });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews((prevPreviews) => [...prevPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  //   const handleSubmit = asyne (e) => {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("price", price);
  //     formData.append("content", content);
  //     formData.append("file", file);

  //     try {
  //       const response = await fetch("https://your-server-endpoint.com/posts", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         // 성공적으로 제출된 경우
  //         console.log("Form submitted successfully");
  //         // 필요한 경우, 페이지 이동 또는 상태 초기화
  //       } else {
  //         // 제출 실패한 경우
  //         console.error("Form submission failed");
  //       }
  //     } catch (error) {
  //       console.error("Error submitting form", error);
  //     }
  //   };
  return (
    <div className="write-container">
      <h2>작성하기</h2>
      <div className="line2"></div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">글 제목 *</label>
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">판매가격 *</label>
          <input
            type="text"
            id="price"
            placeholder="가격을 입력해주세요. (숫자만)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용 *</label>
          <textarea
            id="content"
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">파일첨부 *</label>

          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            multiple
            required
          />

          {filePreviews.length > 0 && (
            <div className="file-preview-container">
              <div className="file-preview">
                {filePreviews.map((preview, index) => (
                  <div className="file-preview-item" key={index}>
                    <img src={preview} />
                    <button
                      type="button"
                      onClick={() => handleFileRemove(index)}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="last">
            <button type="submit" id="submit-button">
              등록
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
