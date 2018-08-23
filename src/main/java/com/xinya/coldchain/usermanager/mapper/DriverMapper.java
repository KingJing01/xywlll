package com.xinya.coldchain.usermanager.mapper;

import com.xinya.coldchain.usermanager.model.Driver;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DriverMapper {

    List<Driver> getListData(@Param("driverCode") String code);
}
