package com.xinya.coldchain.sys.mapper;


import com.xinya.coldchain.sys.model.TsAddress;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

public interface TsAddressMapper {

    TsAddress getTsAddressInfo(@Param("detail_addr") String detailAddr);

    int addTsCustAddr(Map<String,Object> map);

    int updateTsCustAddrisDefault(String pkAddress);


}
