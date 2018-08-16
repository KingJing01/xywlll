package com.xinya.coldchain.tools.shiro;

import com.xinya.coldchain.sys.model.TmsUser;
import com.xinya.coldchain.sys.service.SysService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * @author liyoujing
 * @create 2018-08-08 上午 09:58
 * @desc shiro Authrealm
 **/
public class  AuthRealm extends AuthorizingRealm {

    @Autowired
    private SysService sysService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principal) {
        //获取session中的用户
        TmsUser user =(TmsUser)principal.fromRealm(this.getClass().getName()).iterator().next();
        List<String> permissions=new ArrayList<>();
        //TODO 2018-8-8 此处需要添加用户的权限
        SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
        //将权限放入shiro中.
        info.addStringPermissions(permissions);
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token)
            throws AuthenticationException {
        //在Post请求的时候会先进认证，然后在到请求
        if (token.getPrincipal() == null) {
            return null;
        }
        //获取用户输入的token
        UsernamePasswordToken uToken =(UsernamePasswordToken) token;
        String username = uToken.getUsername();
        TmsUser user = sysService.getUserInfoByUsername(username);
        //放入shiro.调用CredentialsMatcher检验密码
        return new SimpleAuthenticationInfo(user,user.getUserPassword(),this.getClass().getName());
    }
}
