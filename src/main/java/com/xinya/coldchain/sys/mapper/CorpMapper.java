package com.xinya.coldchain.sys.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.Map;

public interface CorpMapper {

   Map<String,String> getCorpInfoByPkCustomer(@Param("pk") String pkCustomer);
}
