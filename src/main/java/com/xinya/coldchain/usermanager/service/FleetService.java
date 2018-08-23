package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.usermanager.mapper.FleetMapper;
import com.xinya.coldchain.usermanager.model.Fleet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class FleetService {
    @Autowired
    private FleetMapper fleetMapper;

    public PageInfo<Fleet> getListData(int pageSize, int pageNum, String code) {
        PageHelper.startPage(pageNum, pageSize);
        List<Fleet> list = fleetMapper.getListData(code);
        PageInfo<Fleet> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }
}
