//사용자 테이블 정의
package nsu_bookexchage.Summer_Project;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    //alter TABLE users AUTO_INCREMENT = 1 - > sql 쿼리문(id값 1부터 다시 시작)

    @Id // 기본키
    @GeneratedValue(strategy = GenerationType.IDENTITY) //자동으로 키 생성
    private Long id;

    @Column(nullable = false, unique = true)
    private String email; // 이메일을 아이디로 사용

    @Column(nullable = false, unique = true)
    private String nickname; // 닉네임

    @Column(nullable = false, unique = true) // 널값 허용 X 및 유일성
    private String username; //실명
    @Column(nullable = false) // 널값 허용 x
    private String password; // 비번

    @Column(nullable = false) // 널값 허용 x
    private String role; // 역할



/////////////////////////////

    public User(){}
    public User(String email, String nickname, String username, String password,String role)
    {
        this.email=email;
        this.nickname = nickname;
        this.username = username;
        this.password = password;
        this.role=role;
    }

    // Getter 및 Setter
    public Long getId() {
        return id;
    }


    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

