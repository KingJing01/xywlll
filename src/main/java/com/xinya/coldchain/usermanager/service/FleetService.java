package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.usermanager.mapper.FleetMapper;
import com.xinya.coldchain.usermanager.model.Fleet;
import com.xinya.coldchain.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

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

    public Map<String, String> getFleetInfo(String pkCarrier, int carrType) {
        Map<String, String> resultMap = null;
        if (CommonUtil.fleetPerson == carrType) {
            resultMap = fleetMapper.getFleetPersonInfo(pkCarrier);
        } else {
            resultMap = fleetMapper.getFleetEntInfo(pkCarrier);
        }
        return resultMap;
    }
}
