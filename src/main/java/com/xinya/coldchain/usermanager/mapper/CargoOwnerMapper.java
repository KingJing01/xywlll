package com.xinya.coldchain.usermanager.mapper;

import com.xinya.coldchain.usermanager.model.CargoOwner;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CargoOwnerMapper {

    List<CargoOwner> getListData(@Param("custCode") String custCode);

    int updateDrStatus(@Param("pkCustomer") String id);

    int updatelockedFlag(@Param("pkCustomer") String id ,@Param("status") String status);
}
