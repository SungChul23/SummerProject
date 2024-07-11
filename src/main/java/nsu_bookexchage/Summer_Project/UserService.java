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
        user.setNickname(userDto.getNickname());
        user.setUserId(userDto.getUserId());
        user.setUsername(userDto.getUsername());
        user.setPassword(encryptedPassword);

        userRepository.save(user);
    }


    //userId를 사용하여 DB에서 사용자 찾기
    public User findUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }


}