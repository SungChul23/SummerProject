//데이터 베이스 접근을 위한 인터페이스

package nsu_bookexchage.Summer_Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> //User 엔티티와 기본 키 타입이 Long인 레포지 정의
{
    User findByUserId(String userId); // userId 기반으로 사용자 조회
}

