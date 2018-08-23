package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.usermanager.mapper.DriverMapper;
import com.xinya.coldchain.usermanager.model.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 司机端管理的service
 * @author liyoujing
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class DriverService {
    @Autowired
    private DriverMapper driverMapper;

    public PageInfo<Driver> getListData(int pageSize, int pageNum, String code) {
        PageHelper.startPage(pageNum, pageSize);
        List<Driver> list = driverMapper.getListData(code);
        PageInfo<Driver> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }
}
