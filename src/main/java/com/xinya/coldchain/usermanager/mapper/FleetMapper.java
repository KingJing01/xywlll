package com.xinya.coldchain.usermanager.mapper;

import com.xinya.coldchain.usermanager.model.Fleet;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface FleetMapper {

    List<Fleet> getListData(@Param("carrCode") String code);

    Map<String,String> getFleetPersonInfo(@Param("pkCarrier") String pkCarrier);

    Map<String,String> getFleetEntInfo(@Param("pkCarrier") String pkCarrier);

    int updatelockedFlag(@Param("pkCarrier")String pkCarrier,@Param("status") String status);

    void updateCarrAndCorp(Map<String,Object> map);

    void updateFleet(Map<String,Object> map);

    Map<String,String> getUserInfoByCarrPk(@Param("pkCarrier") String pkCarrier);
}
