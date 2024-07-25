import React, { useState } from "react";
import './Signin.css';
import { Link } from "react-router-dom";

function Signin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validatePassword = (password) => {
        //비밀번호 유효성 검사 로직 추가(영문, 숫자, 특수문자 포함 8자 이상)
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(password);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    
    const handleSendCode = () => {
    // Validate email (you can add more validation logic here)
    if (!email || !email.includes('@')) {
      setErrorMessage('올바른 이메일 주소를 입력해주세요');
      return;
    }

    if (password !== confirmPassword) { //비번 유효성
        setErrorMessage('비밀번호가 일치하지 않습니다.');
        return;
    }


    setCountdown(180);

    // 코드 로직 전송 (e.g., API call or other actions)
    // Implement your code to send the verification code here
    // ...

    // Clear error message
    setErrorMessage('');

    const intervalld = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
        clearInterval(intervalld);
        setCountdown(0);
    }, 60000);

        setShowVerificationInput(true);
    };

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
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
                    <input 
                        type="email" 
                        placeholder="nsu@nsu.ac.kr"
                        value={email} 
                        onChange={handleEmailChange}
                    />
                    
                    <div className="codebutton">
                        <button onClick={handleSendCode} className="codesendbutton">
                            {countdown > 0 ? `인증 코드 재발송 (${countdown}초 남음)` : `인증 코드 발송`}
                        </button>
                    </div>
                </div>
                {showVerificationInput && (
                <div className="contentWrap">
                    <div className="inputWrap">
                        <input
                            type="text"
                            placeholder="인증 코드 입력"
                            value={verificationCode} // Add the state for the verification code
                            onChange={handleVerificationCodeChange} // Add the event handler for input change
                        />
                    </div>
                </div>
                )}
            </div>
    
            {/* errror 메세지 띄우기  */}
            {/* <div className = "errorText">
                <div>올바른 이메일 주소를 입력해주세요</div>   
            </div> */}
            
            <div className = "contentWrap">
                <div className="inputTitle">
                    이름
                </div>
                <div className="inputWrap">
                    <input
                        placeholder="홍길동"
                    />
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
                    <input 
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
            </div>

            {/* errror 메세지 띄우기  */}
            {!validatePassword(password) && (
                <div className = "errorText">
                    <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
                </div>
            )}

            <div className = "contentWrap">
                <div className="inputTitle">
                    비밀번호 확인
                </div>
                <div className="inputWrap">
                    <input 
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
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