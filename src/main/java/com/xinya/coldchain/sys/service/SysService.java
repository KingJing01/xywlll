package com.xinya.coldchain.sys.service;

import com.xinya.coldchain.sys.sys.dao.SysDao;
import com.xinya.coldchain.utils.DigestPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:18
 * @desc 系统通用模块Service.
 **/
@Service
@Transactional
public class SysService {

    @Autowired
    private SysDao sysDao;

    public Map<String,String> doLogin(String username, String password) {
        Map<String,String> dbMap = sysDao.getUserInfoByUserName(username);
        DigestPasswordEncoder encoder = new DigestPasswordEncoder();
        String encodePassword = encoder.encodePassword(password, null);

        return null;
        //return sysDao.doLogin(username,password);
    }

}
