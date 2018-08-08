package com.xinya.coldchain.sys.controller;

import com.xinya.coldchain.sys.model.TmsUser;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author liyoujing
 * @create 2018-08-06 上午 11:54
 * @desc 系统通用模块
 **/
@RestController
@RequestMapping(value = "sys")
public class SysController {


	@RequestMapping(value = "dologin")
	public String doLogin(HttpServletRequest request, HttpSession session) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
		Subject subject = SecurityUtils.getSubject();
		try {
			//完成登录
			subject.login(usernamePasswordToken);
			TmsUser user=(TmsUser) subject.getPrincipal();
			session.setAttribute("user", user);
			return "redirect:/loginSuccess";
		} catch(Exception e) {
			//返回登录页面
			return "redirect:/index";
		}
	}


	@RequestMapping(value = "loginout")
	public String loginout(HttpSession session) {
		Subject subject = SecurityUtils.getSubject();
		subject.logout();
		session.removeAttribute("user");
		return "redirect:/out";
	}

}
