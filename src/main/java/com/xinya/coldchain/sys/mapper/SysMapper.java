package com.xinya.coldchain.sys.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * tms系统 通用数据接口.
 */
public interface SysMapper {

    List<Map<String,String>> getDictonaryData(@Param("dataTypeCode") String dataTypeCode);

}
