//클라이언트와의 Restful API를 모아두는 컨트롤 클래스

package nsu_bookexchage.Summer_Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

// 로그를 위한 import
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// json 형태를 문자로 변형하여 출력하고 싶어서 추가한 import
import com.fasterxml.jackson.databind.ObjectMapper;
//jWTUtil 클래스 임포트
import nsu_bookexchage.Summer_Project.JWT.JWTUtil;

@Controller
@RestController //RESTful 웹 서비스의 컨트롤러
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class); // 로그 기록

    @Autowired
    private UserService userService; //UserService.java 객체를 받아와 사용

    @Autowired
    private PasswordEncoder passwordEncoder; //UserService.java 객체를 받아와 사용 - 비밀번호 해싱

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private  JWTUtil jwtUtil;

    // 회원 등록
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        // HTTP 요청의 본문에서 JSON 데이터를 UserDto 객체로 변환

        try {
            //입력 받은 json 데이터 로그 기록
            String userDtoJson = objectMapper.writeValueAsString(userDto);
            logger.info("(회원가입) 받은 요구 : {} ", userDto);

            // 회원가입 처리
            userService.registerUser(userDto); //UserService.java를 통해 받은 UserDto를 사용하여 회원을 등록합니다.
            logger.info("회원가입 성공 : {}" , userDtoJson);
            return ResponseEntity.ok("회원가입 성공!"); //200ok OR 400 오류
        } catch (Exception e) {
            logger.info("회원가입 실패 {}" , e.getMessage(), e);
            return ResponseEntity.badRequest().body("회원가입 실패: " + e.getMessage());
        }
    }


    // 회원 로그인
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDto userDto) {
        try {
            //입력 받은 json 데이터 로그 기록
            String userDtoJson = objectMapper.writeValueAsString(userDto);
            logger.info("(로그인) 받은 요구 : {}" , userDtoJson);

            // 입력된 아이디로 사용자 조회
            User existingUser = userService.findUserByUserId(userDto.getUserId());

            // 사용자가 존재하고 비밀번호가 일치하면 로그인 성공
            if (existingUser != null && passwordEncoder.matches(userDto.getPassword(), existingUser.getPassword()))
                {
                    String jwt = jwtUtil.createJwt(existingUser.getUserId(),"user", 1800000L);
                    logger.info("로그인 성공! 사용자: {}, JWT: {}", existingUser.getUserId(), jwt); // 사용자 ID와 JWT 로그
                    return ResponseEntity.ok(jwt); // JWT 반환;

            } else {
                logger.warn("Login failed for user: {}", userDtoJson);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("잘못된 아이디 또는 암호입니다!");
            }

        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 아이디 형식입니다!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그인 처리 실패: " + e.getMessage());
        }
    }
}