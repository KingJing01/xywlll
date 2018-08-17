package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.usermanager.mapper.CargoOwnerMapper;
import com.xinya.coldchain.usermanager.model.CargoOwner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CargoOwnerService {
    @Autowired
    private CargoOwnerMapper cargoOwnerMapper;

    public PageInfo<CargoOwner> getListData(int pageSize, int pageNum) {
        PageHelper.startPage(pageNum,pageSize);
        List<CargoOwner> list = cargoOwnerMapper.getListData();
        PageInfo<CargoOwner> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }
}