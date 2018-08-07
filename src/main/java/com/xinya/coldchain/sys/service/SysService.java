package com.xinya.coldchain.sys.service;

import com.xinya.coldchain.sys.dao.TmsUserDao;
import com.xinya.coldchain.sys.model.TmsUser;
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
	private TmsUserDao tmsUserDao;

	public Map<String, Object> doLogin(String username, String password) {
		DigestPasswordEncoder encoder = new DigestPasswordEncoder();
		String psw = encoder.encodePassword(password, null);
		TmsUser dbMap = tmsUserDao.getUserInfoByParam(username, psw);
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("success", true);
		if (StringUtils.isEmpty(dbMap)) {
			resultMap.put("success", false);
			resultMap.put("message","用户名或密码错误");
		}
		return resultMap;
	}

}
