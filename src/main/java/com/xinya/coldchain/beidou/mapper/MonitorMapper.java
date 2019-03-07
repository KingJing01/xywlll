package com.xinya.coldchain.beidou.mapper;

import com.xinya.coldchain.beidou.model.MonitorRunData;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zoushaohuai on 2019/1/25.
 */
public interface MonitorMapper {
    int insert(MonitorRunData record);

    int insertSelective(MonitorRunData record);
}
