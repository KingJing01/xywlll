package com.xinya.coldchain.sys.dao;

import com.xinya.coldchain.sys.model.TmsUser;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;


/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:19
 * @desc 系统通用模块Dao
 **/

public interface TmsUserDao {
     //用户名密码获取用户信息
     @Select("select pk_user,user_name,user_code,user_type from nw_user where dr=0 and \n"
     +"user_code=#{username} and user_password=#{pwd}")
     TmsUser getUserInfoByParam(@Param("username") String username,@Param("pwd") String pwd);
     
     @Select("select count(0) from nw_user where dr=0")
     int getCount();
}
