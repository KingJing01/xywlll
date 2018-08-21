package com.xinya.coldchain.sys.mapper;

import com.xinya.coldchain.sys.model.NwRole;
import org.apache.ibatis.annotations.Param;

public interface NwRoleMapper {

    NwRole getNwRoleInfo(@Param("roleName") String roleName);
}
