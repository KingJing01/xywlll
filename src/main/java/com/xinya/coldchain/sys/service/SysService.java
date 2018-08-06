package com.xinya.coldchain.sys.service;

import com.xinya.coldchain.sys.dao.SysDao;
import com.xinya.coldchain.sys.model.User;
import com.xinya.coldchain.utils.DigestPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:18
 * @desc 系统通用模块Service.
 **/
@Service(value = "sysService")
@Transactional
public class SysService {

    @Autowired
    private SysDao sysDao;

    public Map<String,Object> doLogin(String username, String password) {
        DigestPasswordEncoder encoder = new DigestPasswordEncoder();
        String psw = encoder.encodePassword(password, null);
        Map<String,String> dbMap= sysDao.getUserInfoByParam(username,psw);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("success",false);
        if(!StringUtils.isEmpty(dbMap)) {
            resultMap.put("success",true);
        }
        return resultMap;
    }

}
