package com.xinya.coldchain.sys.dao;

import com.xinya.coldchain.sys.model.TmsUser;

import org.apache.ibatis.annotations.Select;


/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:19
 * @desc 系统通用模块Dao
 **/

public interface TmsUserDao {

     /**
      *
      * @return
      */
     @Select("select count(0) from nw_user where dr=0")
     int getCount();

     /**
      * 用户名获取用户信息
      * @param username 登陆用户名
      * @return 返回tms数据
      */
     @Select("select pk_user,user_name,user_code,user_type,user_password from nw_user where dr=0 and \n"
             + "user_code=#{username}")
     TmsUser getUserInfoByUsername(String username);
}
