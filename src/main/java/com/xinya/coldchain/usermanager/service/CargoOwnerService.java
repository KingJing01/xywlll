package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.sys.mapper.TmsUserMapper;
import com.xinya.coldchain.sys.model.TmsUser;
import com.xinya.coldchain.usermanager.mapper.CargoOwnerMapper;
import com.xinya.coldchain.sys.mapper.CorpMapper;
import com.xinya.coldchain.sys.model.TsAddressMapper;
import com.xinya.coldchain.usermanager.model.CargoOwner;
import com.xinya.coldchain.sys.model.TsAddress;
import com.xinya.coldchain.utils.CommonUtil;
import com.xinya.coldchain.utils.DateUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * 货主service.
 *
 * @author liyoujing
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class CargoOwnerService {
    @Autowired
    private CargoOwnerMapper cargoOwnerMapper;

    @Autowired
    private CorpMapper corpMapper;

    @Autowired
    private TsAddressMapper tsAddressMapper;

    @Autowired
    private TmsUserMapper tmsUserMapper;

    public PageInfo<CargoOwner> getListData(int pageSize, int pageNum, String custCode) {
        PageHelper.startPage(pageNum, pageSize);
        List<CargoOwner> list = cargoOwnerMapper.getListData(custCode);
        PageInfo<CargoOwner> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    public int updateDrStatus(String id) {
        return cargoOwnerMapper.updateDrStatus(id);
    }

    public int updatelockedFlag(String id, String status) {
        return cargoOwnerMapper.updatelockedFlag(id, status);
    }

    public Map<String, String> getCargoInfoByCode(String pkCustomer) {
        return cargoOwnerMapper.getCargoInfoByCode(pkCustomer);
    }

    public Map<String, String> getCargoCorpInfoByCode(String pkCustomer) {
        return cargoOwnerMapper.getCargoCorpInfoByCode(pkCustomer);
    }

    /**
     * 审核通过 更新ts_re_cust_corp ts_customer  nw_corp 的ts check_status modify_time
     * ts_address  公司地址
     * ts_cust_addr  新增关联关系  is_default 1
     * 新增角色 nw_user_role
     *
     * @param pkCustomer
     */
    public void cargoInfoAuditSuccess(String pkCustomer) {
        TmsUser user = (TmsUser) SecurityUtils.getSubject().getPrincipal();
        Date date = new Date();
        String ts = DateUtils.dateToString(date, DateUtils.DATE_FORMAT_YYYYMMDDHHMMSSSSS);
        String modifyTime = DateUtils.dateToString(date, DateUtils.DEFAULT_DATE_FORMAT);
        String modifyUser = user.getPkUser();
        Map<String, Object> param = new HashMap<>();
        param.put("ts", ts);
        param.put("modifyUser", modifyUser);
        param.put("modifyTime", modifyTime);
        param.put("code", CommonUtil.audited);
        param.put("pk", pkCustomer);
        cargoOwnerMapper.updateCorp(param);
        cargoOwnerMapper.updateCust(param);
        cargoOwnerMapper.updateCustAndCorp(param);
        Map<String, String> result = corpMapper.getCorpInfoByPkCustomer(pkCustomer);
        TsAddress tsAddress = tsAddressMapper.getTsAddressInfo(result.get("address"));
        String pkAddress = tsAddress.getPkAddress();
        param.put("pkAddress", pkAddress);
        //is_default 1
        tsAddressMapper.updateTsCustAddrisDefault(pkAddress);
        tsAddressMapper.addTsCustAddr(param);
        String custCode = cargoOwnerMapper.getCargoInfoByCode(pkCustomer).get("cust_code");
        String pkUser = tmsUserMapper.getUserInfoByUsername(custCode).getPkUser();





    }
}
