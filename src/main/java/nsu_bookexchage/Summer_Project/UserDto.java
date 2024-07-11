//사용자 정보 캡슐화를 통해 하나의 객체로 만들기 위한 .java

package nsu_bookexchage.Summer_Project;

public class UserDto {

    private String nickname;
    private String userId;
    private String username;
    private String password;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
}