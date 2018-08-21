package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.sys.model.TmsUser;
import com.xinya.coldchain.usermanager.mapper.CargoOwnerMapper;
import com.xinya.coldchain.usermanager.model.CargoOwner;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/** 货主service.
 * @author liyoujing
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class CargoOwnerService {
    @Autowired
    private CargoOwnerMapper cargoOwnerMapper;

    public PageInfo<CargoOwner> getListData(int pageSize, int pageNum,String custCode) {
        PageHelper.startPage(pageNum,pageSize);
        List<CargoOwner> list = cargoOwnerMapper.getListData(custCode);
        PageInfo<CargoOwner> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    public int updateDrStatus(String id) {
        return cargoOwnerMapper.updateDrStatus(id);
    }

    public int updatelockedFlag(String id ,String status) {
        return cargoOwnerMapper.updatelockedFlag(id,status);
    }

    public Map<String,String> getCargoInfoByCode(String pkCustomer) {
        return cargoOwnerMapper.getCargoInfoByCode(pkCustomer);
    }
    public Map<String,String> getCargoCorpInfoByCode(String pkCustomer) {
        return cargoOwnerMapper.getCargoCorpInfoByCode(pkCustomer);
    }

    /**
     * 审核通过 更新ts_re_cust_corp ts_customer  nw_corp 的ts check_status modify_time
     * @param pkCustomer
     */
    public void cargoInfoAuditSuccess(String pkCustomer) {
        TmsUser user = (TmsUser) SecurityUtils.getSubject().getPrincipal();

    }
}
