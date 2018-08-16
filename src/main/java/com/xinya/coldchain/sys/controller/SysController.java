package com.xinya.coldchain.sys.controller;

import com.xinya.coldchain.sys.model.TmsUser;

import com.xinya.coldchain.sys.service.SysService;
import org.apache.ibatis.type.Alias;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-06 上午 11:54
 * @desc 系统通用模块
 **/
@Controller
public class SysController {

	@Autowired
	private SysService sysService;

	@RequestMapping(value = {"/","/index"})
	public String indexPage() {
	  return "login";
	}


	@RequestMapping(value = "dologin")
	@ResponseBody
	public Map<String,String> doLogin(HttpServletRequest request, HttpSession session) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		TmsUser tmsUser = sysService.selectUserByPk("961be3c20e8b4b328b9204d74276ae04");
		UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
		Subject subject = SecurityUtils.getSubject();
		Map<String,String> map = new HashMap<>();
		try {
			//完成登录
			subject.login(usernamePasswordToken);
			TmsUser user=(TmsUser) subject.getPrincipal();
			session.setAttribute("user", user);
			map.put("url","/xinyang/login");
			return map;
		} catch(Exception e) {
			//返回登录页面
			map.put("url","/xinyang/index");
			return map;
		}
	}


	@RequestMapping(value = "login")
	public String  loginPage() {
	  return "index";
	}

}
