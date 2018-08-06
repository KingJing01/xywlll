package com.xinya.coldchain.sys.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:19
 * @desc 系统通用模块Dao
 **/

public interface SysDao {

    @Select(" select pk_user,user_code,user_type,user_name from nw_user \n"
            + "where user_code=#{username} and user_password=#{pwd} and and dr=0 ")
    Map<String,String> getUserInfoByParam(@Param("username") String username,@Param("pwd") String pwd);
}
