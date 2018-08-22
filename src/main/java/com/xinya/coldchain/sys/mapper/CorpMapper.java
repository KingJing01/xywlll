package com.xinya.coldchain.sys.mapper;

import com.xinya.coldchain.sys.model.NwCorp;
import org.apache.ibatis.annotations.Param;

public interface CorpMapper {

   NwCorp getCorpInfoByPkCustomer(@Param("pk") String pkCustomer);
}
