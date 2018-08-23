package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.usermanager.model.Driver;
import com.xinya.coldchain.usermanager.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
