package nsu_bookexchage.Summer_Project.univcert;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;
import org.json.JSONObject;

@Service
public class UnivCertService {

    private static final Logger logger = LoggerFactory.getLogger(UnivCertService.class);

    @Value("${univcert.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate(); // RestTemplate 직접 초기화

    // 대학교 이메일 전송
    public String sendVerificationEmail(String email) {
        String url = "https://univcert.com/api/v1/certify"; // 대학교 메일 인증 코드 요청

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        JSONObject postObj = new JSONObject();
        postObj.put("key", apiKey);
        postObj.put("email", email);
        postObj.put("univName", "남서울대학교");
        postObj.put("univ_check", true); // true 또는 false 설정

        HttpEntity<String> entity = new HttpEntity<>(postObj.toString(), headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        logger.info("API Response(인증코드 발송): {}", response.getBody());

        // 응답이 성공인지 확인
        if (Objects.requireNonNull(response.getBody()).contains("\"success\":true")) {
            logger.info("인증 이메일이 성공적으로 발송되었습니다.");
            return "인증 이메일이 성공적으로 발송되었습니다.";
        } else {
            logger.error("인증 이메일 발송 실패: {}", response.getBody());
            return "인증 이메일 발송 실패";
        }
    }

    // 대학교 이메일 인증 코드 확인
    public boolean verifyEmail(String email, int code) {
        String url = "https://univcert.com/api/v1/certifycode";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        JSONObject postObj = new JSONObject();
        postObj.put("key", apiKey);
        postObj.put("email", email);
        postObj.put("univName", "남서울대학교");
        postObj.put("code", code);

        HttpEntity<String> entity = new HttpEntity<>(postObj.toString(), headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        HttpStatus statusCode = (HttpStatus) response.getStatusCode();
        String responseBody = response.getBody();

        if (statusCode != HttpStatus.OK) {
            logger.error("API 호출 실패, 상태 코드: {}, 응답 본문: {}", statusCode, responseBody);
            return false;
        }

        try {
            JSONObject jsonResponse = new JSONObject(responseBody);
            boolean success = jsonResponse.optBoolean("success", false);

            if (success) {
                return true;
            } else {
                String message = jsonResponse.optString("message", "알 수 없는 오류 발생");

                switch (message) {
                    case "일치하지 않는 인증코드입니다.":
                        logger.error("인증 코드 불일치: {}", responseBody);
                        break;
                    case "이미 완료된 요청입니다.":
                        logger.error("이미 사용된 인증 코드: {}", responseBody);
                        break;
                    default:
                        logger.error("인증 코드 검증 실패: {}", responseBody);
                        break;
                }

                return false;
            }
        } catch (Exception e) {
            logger.error("응답 본문 파싱 오류: {}", responseBody, e);
            return false;
        }
    }


    // 인증된 유저 목록 초기화
    public boolean clearVerifiedUsers() {
        String url = "https://univcert.com/api/v1/clear"; // 인증된 유저 목록 초기화 URL

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        String requestJson = String.format("{\"key\":\"%s\"}", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        logger.info("API Response: {}", response.getBody());

        // 응답이 성공인지 확인
        if (Objects.requireNonNull(response.getBody()).contains("\"success\":true")) {
            logger.info("인증된 유저 목록이 성공적으로 초기화되었습니다.");
            return true;
        } else {
            logger.error("인증된 유저 목록 초기화 실패: {}", response.getBody());
            return false;
        }
    }
}
