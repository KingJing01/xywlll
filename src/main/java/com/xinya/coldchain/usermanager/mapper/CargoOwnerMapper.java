package com.xinya.coldchain.usermanager.mapper;

import com.xinya.coldchain.usermanager.model.CargoOwner;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface CargoOwnerMapper {

    List<CargoOwner> getListData(@Param("custCode") String custCode,
                                 @Param("sort") String sort,@Param("order") String order);

    int updateDrStatus(@Param("pkCustomer") String id);

    int updatelockedFlag(@Param("pkCustomer") String id ,@Param("status") String status);

    Map<String,String> getCargoInfoByCode(@Param("pkCustomer") String pkCustomer);

    Map<String,String> getCargoCorpInfoByCode(@Param("pkCustomer") String pkCustomer);

    void updateCustAndCorp(Map<String,Object> map);

    void updateCorp(Map<String,Object> map);

    void updateCust(Map<String,Object> map);


}
