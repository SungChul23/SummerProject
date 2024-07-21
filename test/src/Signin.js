import React, { useState } from "react";
import './Signin.css';

function Signin(){
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Function to handle sending verification code
    const handleSendCode = () => {
    // Validate email (you can add more validation logic here)
    if (!email || !email.includes('@')) {
      setErrorMessage('올바른 이메일 주소를 입력해주세요');
      return;
    }

    // Send verification code logic (e.g., API call or other actions)
    // Implement your code to send the verification code here
    // ...

    // Clear error message
    setErrorMessage('');
};

    return (
        
        <div className = "page">
            {/* Title Wrap*/}
            <div className = "titleWrap">
                회원가입
            </div>
    
            {/* contentWrap - 이메일 입력 */}
            <div className = "contentWrap">
                <div className="inputTitle">
                    대학교 이메일
                </div>
                <div className="inputWrap">
                    <input type="email" value={email} onChange={handleEmailChange}/>
                    
                    <div className="contentWrap">
                        <button onClick={handleSendCode}>인증 코드 발송</button>
                    </div>
                </div>
            </div>
    
            {/* errror 메세지 띄우기  */}
            <div className = "errorMessageWrap">
                <div>올바른 이메일 주소를 입력해주세요</div>
    
            </div>
            
            <div className = "contentWrap">
                <div className="inputTitle">
                    성명
                </div>
                <div className="inputWrap">
                    <input></input>
                </div>
            </div>

            <div className = "contentWrap">
                <div className="inputTitle">
                    아이디
                </div>
                <div className="inputWrap">
                    <input></input>
                </div>
            </div>
            
            <div className = "contentWrap">
                <div className="inputTitle">
                    비밀번호
                </div>
                <div className="inputWrap">
                    <input></input>
                </div>
            </div>

            <div className = "contentWrap">
                <div className="inputTitle">
                    비밀번호 확인
                </div>
                <div className="inputWrap">
                    <input></input>
                </div>
            </div>
    
            {/* errror 메세지 띄우기  */}
            <div className = "errorMessageWrap">
                <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
    
            </div>
        </div>
    );
}

export default Signin;