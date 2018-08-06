package com.xinya.coldchain.sys;

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

    @RequestMapping(value = "login")
    public Map<String,String> doLogin(String username,String password) {
        return null;
    }

}
