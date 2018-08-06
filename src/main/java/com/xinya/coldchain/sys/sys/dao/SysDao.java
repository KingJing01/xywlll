package com.xinya.coldchain.sys.sys.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:19
 * @desc 系统通用模块Dao
 **/
public interface SysDao {

    @Select(" select pk_user,user_code,user_password,user_type,user_name from nw_user \n"
            + "where user_code=#{username} and dr=0 ")
    Map<String,String> getUserInfoByUserName(@Param("username") String username);
}
