import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    const [userIdInput, setUserIdInput] = useState(' ');
    const [userPwInput, setUserPwInput] = useState(' ');
    const [showPassword, setShowPassword] = useState(false); //비번 숨기기/보이기 상태 변수
    const [emailValid, setEmailValid] = useState(true);

    const handleChangeInput = (e) => {
        setUserIdInput(e.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword); // 보이기/숨기기 토글
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        //비밀번호 유효성 검사 로직 추가(영문, 숫자, 특수문자 포함 8자 이상)
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return re.test(password);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'userIdInput') {
            setEmailValid(validateEmail(value)); // Check email validity
        }
        if (name === 'userPwInput'){
            setUserPwInput(value);
        }
    };

  return (
    <div className = "login_page">
        {/* Title Wrap*/}
        <div className = "titleWrap">
            로그인
        </div>

        {/* contentWrap - 이메일 입력 */}
        <div className = "contentWrap">
            <div className="inputTitle">
                이메일 주소
            </div>
            <div className="inputWrap">
            <input
                name="userIdInput"
                id="Id"
                placeholder="이메일"
                value={userIdInput}
                onChange={handleChangeInput}
                onBlur={handleBlur} //메일 유효성 검사
                />
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        {!emailValid && 
            <div className="errorText">
                올바른 이메일 주소를 입력해주세요
            </div>}

        <div className = "contentWrap">
            <div className="inputTitle">
                비밀번호
            </div>
            <div className="inputWrap">
                <input
                    type={showPassword ? 'text' : 'password'} // 입력 타입 동적 설정
                    name="userPw"
                    id="password"
                    placeholder="비밀번호"
                    maxLength={16}
                    value={userPwInput}
                    onChange={(e) => setUserPwInput(e.target.value)} //비밀번호 입력 처리
                    onBlur={handleBlur}
                />
                <div className="showHidePasswordButton">
                    <button onClick={handleShowPassword} className='shpb'>
                        {showPassword ? 'Hide' : 'Show'} 
                    </button>
                </div>
            </div>
        </div>

        {/* errror 메세지 띄우기  */}
        {!validatePassword(userPwInput) && (
        <div className = "errorText">
            <div> 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
        </div>
        )}

        <div className='checkbutton'>
            <button type='button' className='btnLogin'>
                로그인
            </button>
            <Link to="/Signin">
            <button type='button' className='btnSign'>                
                회원가입
            </button>
            </Link>
        </div>        
    </div>
  );
}

export default Login;