package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.usermanager.model.Fleet;
import com.xinya.coldchain.usermanager.service.FleetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 车队信息
 * @author liyoujing
 */
@RestController
@RequestMapping(value = "fleet")
public class FleetController {

    @Autowired
    private FleetService fleetService;

    @RequestMapping(value = "get_list_data")
    public PageInfo<Fleet> getListData(int pageSize, int pageNumber, String code){
        return fleetService.getListData(pageSize,pageNumber,code);
    }
}
