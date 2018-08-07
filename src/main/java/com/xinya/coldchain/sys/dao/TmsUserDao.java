package com.xinya.coldchain.sys.dao;

import com.xinya.coldchain.sys.model.TmsUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


/**
 * @author liyoujing
 * @create 2018-08-06 下午 04:19
 * @desc 系统通用模块Dao
 **/
@Mapper
public interface TmsUserDao {

    public TmsUser getUserInfoByParam(@Param("username") String username,@Param("pwd") String pwd);
}
