package com.xinya.coldchain.xinya.shiro;

import com.xinya.coldchain.utils.DigestPasswordEncoder;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;

/**
 * @author liyoujing
 * @create 2018-08-08 上午 10:26
 * @desc CredentialsMatcher
 **/
public class CredentialsMatcher extends SimpleCredentialsMatcher {

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        UsernamePasswordToken utoken=(UsernamePasswordToken) token;
        //获得用户输入的密码:(使用TMS的加密方式去加密)
        String inPassword = new String(utoken.getPassword());
        DigestPasswordEncoder encoder = new DigestPasswordEncoder();
        String psw = encoder.encodePassword(inPassword, null);
        //获得数据库中的密码
        String dbPassword=(String) info.getCredentials();
        //进行密码的比对
        return this.equals(psw, dbPassword);
    }
}
