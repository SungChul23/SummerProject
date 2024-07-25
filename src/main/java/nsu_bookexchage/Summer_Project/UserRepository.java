//데이터 베이스 접근을 위한 인터페이스

package nsu_bookexchage.Summer_Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //이메일 확인 (로그인 시)
    User findByEmail(String email);

    //닉네임 중복 체크
    boolean existsByNickname(String nickname);
}

