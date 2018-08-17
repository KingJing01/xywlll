package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.usermanager.model.CargoOwner;
import com.xinya.coldchain.usermanager.service.CargoOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用户管理--货主管理模块
 *
 * @author liyoujing
 */
@RestController
@RequestMapping(value = "cargo_owner")
public class CargoOwnerController {

    @Autowired
    private CargoOwnerService cargoOwnerService;

    @RequestMapping(value = "get_list_data")
    public PageInfo<CargoOwner> getListData(Pageable pageable) {
        return cargoOwnerService.getListData(pageable.getPageSize(), pageable.getPageNumber());
    }

}
