package com.xinya.coldchain.sys.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * tms用户登陆信息
 */
@Entity
public class TmsUser {
    @Id
    @Column(name = "pk_user")
    private String pkUser;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_code")
    private String userCode;
    @Column(name = "user_type")
    private String userType;
    @Column(name = "user_password")
    private String userPassword;

    public String getPkUser() {
        return pkUser;
    }

    public void setPkUser(String pkUser) {
        this.pkUser = pkUser;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }


}
