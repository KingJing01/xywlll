package com.xinya.coldchain.sys.controller;

import com.github.pagehelper.util.StringUtil;
import com.xinya.coldchain.sys.service.SysService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
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

	@RequestMapping(value = "dologin")
	@ResponseBody
	public Map<String, Object> doLogin(String username, String password) {
		Map<String,Object> resultMap = new HashMap<String, Object>();
		if (StringUtils.isEmpty(username)) {
			resultMap.put("message", "用户名不能为空");
			resultMap.put("success", false);
            return resultMap;
		}
		if (StringUtils.isEmpty(password)) {
			resultMap.put("message", "请输入密码");
			resultMap.put("success", false);
            return resultMap;
		}
		return sysService.doLogin(username, password);
	}

}
