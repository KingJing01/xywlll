package com.xinya.coldchain.sys.dao;

import com.xinya.coldchain.sys.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:19
 * @desc 系统通用模块Dao
 **/
@Mapper
public interface SysDao {

    public User getUserInfoByParam(String username, String pwd);
}
