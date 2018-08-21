package com.xinya.coldchain.sys.model;


import java.util.Map;

public interface TsAddressMapper {

    TsAddress getTsAddressInfo(String detailAddr);

    int addTsCustAddr(Map<String,Object> map);

    int updateTsCustAddrisDefault(String pkAddress);


}
