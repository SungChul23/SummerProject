package nsu_bookexchage.Summer_Project.JWT;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Component
public class JWTUtil {
    private SecretKey secretKey;

    public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
        // HS256 알고리즘을 명시적으로 설정 ㄱ
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

    }

    public String getEmail(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("email", String.class);
    }

    public Boolean isExpired(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }


// 토큰 생성
    public String createJwt(String email, String username, String nickname, String role, String expiredMsString) {
        long expiredMs = Long.parseLong(expiredMsString); // 문자열을 long으로 변환

        return Jwts.builder()
                .claim("email", email)
                .claim("username", username)
                .claim("nickname", nickname)
                .claim("role", role)
                .setIssuedAt(new Date(System.currentTimeMillis())) // 발행시간
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs)) // 소멸시간
                .signWith(secretKey) // 암호화(서명)
                .compact();
    }
}
