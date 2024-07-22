import React, { useState } from "react";
import './Signin.css';
import { Link } from "react-router-dom";

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

    // 코드 로직 전송 (e.g., API call or other actions)
    // Implement your code to send the verification code here
    // ...

    // Clear error message
    setErrorMessage('');
};

    return (
        
        <div className = "signin_page">
            {/* Title Wrap*/}
            <div className = "titleWrap">
                회원가입
            </div>
    
            {/* contentWrap - 이메일 입력 */}
            <div className = "contentWrap">
                <div className="inputTitle">
                    학교 이메일
                </div>
                <div className="inputWrap">
                    <input type="email" value={email} onChange={handleEmailChange}/>
                    
                    <div className="codebutton">
                        <button onClick={handleSendCode} className="codesendbutton">인증 코드 발송</button>
                    </div>
                </div>
            </div>
    
            {/* errror 메세지 띄우기  */}
            <div className = "errorText">
                <div>올바른 이메일 주소를 입력해주세요</div>
    
            </div>
            
            <div className = "contentWrap">
                <div className="inputTitle">
                    이름
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
                    <div className="codebutton">
                        <button onClick={handleSendCode} 
                        className="codesendbutton">
                            중복 확인
                        </button>
                    </div>
                </div>
            </div>
            
            <div className = "contentWrap">
                <div className="inputTitle">
                    비밀번호
                </div>
                <div className="inputWrap">
                    <input type="password"></input>
                </div>
            </div>

            {/* errror 메세지 띄우기  */}
            <div className = "errorText">
                <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
    
            </div>

            <div className = "contentWrap">
                <div className="inputTitle">
                    비밀번호 확인
                </div>
                <div className="inputWrap">
                    <input type="password"></input>
                </div>
            </div>
    
            {/* errror 메세지 띄우기  */}
            <div className = "errorText">
                <div> 비밀번호가 올바르지 않습니다.</div>
    
            </div>

            <div className='checkbutton'>
                <button type='button' className='lastsign'>                
                    회원가입
                </button>
            </div> 
        </div>
    );
}

export default Signin;