package com.xinya.coldchain.sys.mapper;

import com.xinya.coldchain.sys.model.TmsUser;
import org.apache.ibatis.annotations.Mapper;


/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:19
 * @desc 系统通用模块Dao
 **/
@Mapper
public interface TmsUserMapper {

     /**
      * 用户名获取用户信息
      * @param username 登陆用户名
      * @return 返回tms数据
      */
 /*    @Select("select pk_user pkUser,user_name userName,user_code userCode,user_type user_type,"
             + "user_password userPassword from nw_user where dr=0 and  user_code=#{username}")*/
     TmsUser getUserInfoByUsername(String username);

     TmsUser selectUserByPk(String pk);
}
