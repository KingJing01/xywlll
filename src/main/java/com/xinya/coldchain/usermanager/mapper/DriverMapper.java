package com.xinya.coldchain.usermanager.mapper;

import com.xinya.coldchain.usermanager.model.Driver;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface DriverMapper {

    List<Driver> getListData(Map<String,String> map);
}
