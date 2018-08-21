package com.xinya.coldchain.usermanager.mapper;


import com.xinya.coldchain.usermanager.model.TsAddress;

import java.util.Map;

public interface TsAddressMapper {

    TsAddress getTsAddressInfo(String detailAddr);

    int addTsCustAddr(Map<String,Object> map);

    int updateTsCustAddrisDefault(String pkAddress);


}
