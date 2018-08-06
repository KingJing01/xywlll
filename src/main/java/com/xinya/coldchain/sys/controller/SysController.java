package com.xinya.coldchain.sys.controller;

import com.xinya.coldchain.sys.service.SysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-06 上午 11:54
 * @desc 系统通用模块
 **/
@Controller
@RequestMapping(value = "sys")
public class SysController {

    @Autowired
    private SysService sysService;

    @RequestMapping(value = "login")
    public Map<String,Object> doLogin(String username,String password) {
        return sysService.doLogin(username,password);
    }

}
