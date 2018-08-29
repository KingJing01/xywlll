package com.xinya.coldchain.sys.controller;

import com.xinya.coldchain.sys.model.TmsUser;

import com.xinya.coldchain.sys.service.SysService;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.ibatis.type.Alias;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
		UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
		Subject subject = SecurityUtils.getSubject();
		Map<String,String> map = new HashMap<>();
		try {
			String timestamp = String.valueOf(System.currentTimeMillis());
			//完成登录
			subject.login(usernamePasswordToken);
			TmsUser user=(TmsUser) subject.getPrincipal();
			session.setAttribute("user", user);
			StringBuffer str = new StringBuffer();
			str.append("appkey=ca1d6a0d5d1983d874001cea&");
			str.append("timestamp=").append(timestamp);
			str.append("&random_str="+user.getUserCode());
			str.append("&key=5c0ead5838e03110b1e4bb6f");
			String signature = DigestUtils.md5Hex(str.toString());
			map.put("url","/xinyang/login");
			map.put("timestamp",timestamp);
			map.put("signature",signature);
			map.put("userCode",user.getUserCode());
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

	@RequestMapping(value = "get_img_url",method = RequestMethod.POST)
	@ResponseBody
    public Map<String,String> getImgUrl() {
		return sysService.getImgUrl();
	}
}
