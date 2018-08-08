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

	public TmsUser getUserInfoByUsername(String username) {
		return tmsUserDao.getUserInfoByUsername(username);
	}

}
