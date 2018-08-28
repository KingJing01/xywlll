package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.sys.model.TmsUser;
import com.xinya.coldchain.usermanager.mapper.DriverMapper;
import com.xinya.coldchain.usermanager.model.Driver;
import com.xinya.coldchain.utils.CommonUtil;
import com.xinya.coldchain.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.shiro.SecurityUtils;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Map<String,String> param = new HashMap<String, String>();
        param.put("driverCode",code);
        List<Driver> list = driverMapper.getListData(param);
        PageInfo<Driver> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    public Driver getDriverInfoByCode(String pkDriver) {
        Map<String,String> param = new HashMap<String, String>();
        param.put("pkDriver",pkDriver);
        List<Driver> list =  driverMapper.getListData(param);
        return list.get(0);
    }


    public void driverAuditReject(String pkDriver,String reason) {
        TmsUser user = (TmsUser) SecurityUtils.getSubject().getPrincipal();
        Date date = new Date();
        String ts = DateUtils.dateToString(date, DateUtils.DATE_FORMAT_YYYYMMDDHHMMSSSSS);
        String modifyTime = DateUtils.dateToString(date, DateUtils.DEFAULT_DATE_FORMAT);
        String modifyUser = user.getPkUser();
        Map<String,Object> param = new HashMap<>();
        param.put("pkDriver",pkDriver);
        param.put("memo",reason);
        param.put("ts",ts);
        param.put("modifyTime",modifyTime);
        param.put("modifyUser",modifyUser);
        param.put("checkStatus",CommonUtil.auditReject);
        driverMapper.updateDriver(param);
        driverMapper.updateDriverAndCarr(param);
    }
}
