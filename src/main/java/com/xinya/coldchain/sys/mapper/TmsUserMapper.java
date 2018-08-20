package com.xinya.coldchain.sys.mapper;

import com.xinya.coldchain.sys.model.TmsUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;


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
     TmsUser getUserInfoByUsername(String username);

     Map<String,String> getImgUrl();

}
