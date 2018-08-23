package com.xinya.coldchain.usermanager.mapper;

import com.xinya.coldchain.usermanager.model.Fleet;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FleetMapper {

    List<Fleet> getListData(@Param("carrCode") String code);
}
