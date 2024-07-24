package nsu_bookexchage.Summer_Project;

import nsu_bookexchage.Summer_Project.univcert.UnivCertService;
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
// JWTUtil 클래스 임포트
import nsu_bookexchage.Summer_Project.JWT.JWTUtil;
import java.util.Map;
import java.util.HashMap;
import java.time.LocalDateTime;

@Controller
@RestController // RESTful 웹 서비스의 컨트롤러
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class); // 로그 기록

    @Autowired
    private UserService userService; // UserService 객체를 받아와 사용

    @Autowired
    private PasswordEncoder passwordEncoder; // 비밀번호 해싱

    @Autowired
    private ObjectMapper objectMapper; // JSON 변환

    @Autowired
    private JWTUtil jwtUtil; // JWT 생성

    @Autowired
    private UnivCertService univCertService; // 대학 인증 서비스

    // 대학 메일 인증 요청
    @PostMapping("/email-send")
    public ResponseEntity<Map<String, Object>> sendVerificationEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            logger.info("Received email for verification: {}", email); // 받은 이메일 로그 확인
            String response = univCertService.sendVerificationEmail(email);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("success", true);
            responseBody.put("message", "이메일 인증 요청이 성공했습니다.");
            responseBody.put("response", response);

            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            logger.error("이메일 인증 실패 : {}", e.getMessage(), e);
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("success", false);
            responseBody.put("message", "이메일 인증 요청 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
        }
    }

    // 대학 메일 인증 코드 확인
    @PostMapping("/email-certification")
    public ResponseEntity<Map<String, Object>> verifyEmail(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            Integer code = (Integer) request.get("code"); // 정수형으로 캐스팅

            if (email == null || code == 0) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "이메일 또는 인증 코드가 누락되었습니다.");
                return ResponseEntity.badRequest().body(response);
            }

            logger.info("사용자가 입력한 이메일과 코드: {} 그리고 code: {}", email, code);

            boolean success = univCertService.verifyEmail(email, code);

            Map<String, Object> response = new HashMap<>();
            if (success) {
                response.put("success", true);
                response.put("univName", "남서울대학교");
                response.put("certified_email", email);
                response.put("certified_date", LocalDateTime.now().toString());

                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("status", 400);
                response.put("message", "인증 코드가 일치하지 않습니다.");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            logger.error("이메일 인증 실패: {}", e.getMessage(), e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("status", 500);
            response.put("message", "이메일 인증 처리 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 인증된 유저 목록 초기화
    @PostMapping("/clear-verified-users")
    public ResponseEntity<Map<String, Object>> clearVerifiedUsers() {
        try {
            boolean success = univCertService.clearVerifiedUsers();

            Map<String, Object> response = new HashMap<>();
            if (success) {
                response.put("success", true);
                response.put("message", "인증된 유저 목록이 성공적으로 초기화되었습니다.");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "인증된 유저 목록 초기화 실패");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            logger.error("인증된 유저 목록 초기화 실패: {}", e.getMessage(), e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "인증된 유저 목록 초기화 처리 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody UserDto userDto) {
        try {
            // 입력 받은 json 데이터 로그 기록
            String userDtoJson = objectMapper.writeValueAsString(userDto);
            logger.info("(회원가입) 받은 요구 : {} ", userDtoJson);


            // 회원가입 처리
            userService.registerUser(userDto); // UserService.java를 통해 받은 UserDto를 사용하여 회원을 등록
            logger.info("회원가입 성공 (DB저장 완료 !) : {}", userDtoJson);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "회원가입이 성공적으로 완료되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("회원가입 실패: {}", e.getMessage(), e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "회원가입 실패: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    //닉네임 중복 체크
    @GetMapping("/check-nickname")
    public ResponseEntity<Map<String, Object>> checkNickname(@RequestParam  ("nickname") String nickname) {
        try {
            boolean isDuplicate = userService.isNicknameDuplicate(nickname);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("isDuplicate", isDuplicate);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("닉네임 중복 검사 실패: {}", e.getMessage(), e);
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "닉네임 중복 검사 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // 회원 로그인
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDto userDto) {
        try {
            // 입력된 이메일로 사용자 조회
            User existingUser = userService.findUserByEmail(userDto.getEmail());

            // 사용자가 존재하고 비밀번호가 일치하면 로그인 성공
            if (existingUser != null && passwordEncoder.matches(userDto.getPassword(), existingUser.getPassword())) {
                // JWT 생성 (선택 사항: 필요 시 추가)
                String jwt = jwtUtil.createJwt(
                        existingUser.getEmail(),
                        existingUser.getUsername(),
                        existingUser.getNickname(),
                        existingUser.getRole(), // 비밀번호는 토큰에 포함하지 않음
                        String.valueOf(1800000L) // 30분
                );

                logger.info("Login successful for user: {}", existingUser.getEmail());
                return ResponseEntity.ok(jwt); // JWT 반환 또는 성공 메시지 반환
            } else {
                logger.warn("Login failed for user: {}", userDto.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("잘못된 이메일 또는 암호입니다!");
            }

        } catch (Exception e) {
            logger.error("Login processing failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("로그인 처리 실패: " + e.getMessage());
        }
    }



}