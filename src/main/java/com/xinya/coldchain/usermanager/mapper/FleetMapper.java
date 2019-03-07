package com.xinya.coldchain.usermanager.mapper;

import com.xinya.coldchain.usermanager.model.Fleet;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface FleetMapper {

    List<Fleet> getListData(Map<String,String> map);
    Map<String, String> getFleetPersonInfo(@Param("pkCarrier") String pkCarrier);

    Map<String, String> getFleetEntInfo(@Param("pkCarrier") String pkCarrier);

    int updatelockedFlag(@Param("pkCarrier") String pkCarrier, @Param("status") String status);

    int updateCarrAndCorp(Map<String, Object> map);

    int updateFleet(Map<String, Object> map);

    int updateCorp(Map<String, Object> map);

    Map<String, String> getUserInfoByCarrPk(@Param("pkCarrier") String pkCarrier);

    int checkInviteCode(@Param("inviteCode") String inviteCode);
}
