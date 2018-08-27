package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.tools.repsonse.RespMessage;
import com.xinya.coldchain.usermanager.model.Driver;
import com.xinya.coldchain.usermanager.service.DriverService;
import com.xinya.coldchain.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 司机端信息审核.
 * @author liyoujing
 */
@RestController
@RequestMapping(value = "driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @RequestMapping(value = "get_list_data")
    public PageInfo<Driver> getListData(int pageSize, int pageNumber, String code) {
       return driverService.getListData(pageSize,pageNumber,code);
    }

    @RequestMapping(value = "/driverInfo/{pkDriver}",method = RequestMethod.POST)
    public RespMessage getDriverInfoByCode(@PathVariable String pkDriver) {
        Driver driver = null;
        try {
            driver = driverService.getDriverInfoByCode(pkDriver);
            return new RespMessage("成功", CommonUtil.respSuccess, driver);
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage(CommonUtil.respFail);
        }
    }
}
