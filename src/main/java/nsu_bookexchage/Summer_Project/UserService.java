//비즈니스 로직 구현 + DB와의 상호작용
package nsu_bookexchage.Summer_Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;



    public void registerUser(UserDto userDto) {
        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(userDto.getPassword());

        // User 객체 생성 및 저장
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setNickname(userDto.getNickname());
        user.setUsername(userDto.getUsername());
        user.setPassword(encryptedPassword);
        user.setRole("user");

        userRepository.save(user); // DB에 저장

    }
    //userId를 사용하여 DB에서 사용자 찾기
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email); // 이메일로 사용자 조회
    }

    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

}