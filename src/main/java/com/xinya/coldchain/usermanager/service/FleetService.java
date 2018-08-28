package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.sys.mapper.NwRoleMapper;
import com.xinya.coldchain.sys.mapper.NwUserRoleMapper;
import com.xinya.coldchain.sys.mapper.SysMapper;
import com.xinya.coldchain.sys.mapper.TmsUserMapper;
import com.xinya.coldchain.sys.model.TmsUser;
import com.xinya.coldchain.usermanager.mapper.FleetMapper;
import com.xinya.coldchain.usermanager.model.Fleet;
import com.xinya.coldchain.utils.CommonUtil;
import com.xinya.coldchain.utils.DateUtils;
import com.xinya.coldchain.utils.RandomCodeUtil;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class FleetService {
    private static Logger logger = LoggerFactory.getLogger(FleetService.class);
    @Autowired
    private FleetMapper fleetMapper;

    @Autowired
    private SysMapper sysMapper;

    @Autowired
    private NwRoleMapper nwRoleMapper;

    @Autowired
    private NwUserRoleMapper nwUserRoleMapper;


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
            if (StringUtils.isEmpty(resultMap)) {
                return null;
            }
            StringBuffer buffer = new StringBuffer();
            if (!StringUtils.isEmpty(resultMap.get("trans_type"))) {
                String transType = resultMap.get("trans_type");
                String[] arr = transType.split(",");
                int arrlength = arr.length;
                //企业级用户判断运输类型
                List<Map<String, String>> list = sysMapper.getDictonaryData("trans_type");
                for (Map<String, String> data : list) {
                    for (int i = 0; i < arrlength; i++) {
                        if (data.get("value").equals(arr[i])) {
                            buffer.append(data.get("display_name"));
                            buffer.append("\t");
                        }
                    }
                }
            }
            if (!StringUtils.isEmpty(buffer)) {
                resultMap.put("trans_type", buffer.toString());
            }
        }
        return resultMap;
    }

    public int updatelockedFlag(String pkCarrier, String status) {
        return fleetMapper.updatelockedFlag(pkCarrier, status);
    }

    public void fleetInfoReject(String pkCarrier, String reason) {
        TmsUser user = (TmsUser) SecurityUtils.getSubject().getPrincipal();
        Date date = new Date();
        String ts = DateUtils.dateToString(date, DateUtils.DATE_FORMAT_YYYYMMDDHHMMSSSSS);
        String modifyTime = DateUtils.dateToString(date, DateUtils.DEFAULT_DATE_FORMAT);
        String modifyUser = user.getPkUser();
        Map<String, Object> param = new HashMap<>();
        param.put("pkCarrier", pkCarrier);
        param.put("memo", reason);
        param.put("ts", ts);
        param.put("modifyTime", modifyTime);
        param.put("modifyUser", modifyUser);
        param.put("checkStatus", CommonUtil.auditReject);
        fleetMapper.updateFleet(param);
        fleetMapper.updateCarrAndCorp(param);
    }

    /**
     * 审核通过
     * 新增角色 nw_user_role
     * @param pkCarrier 承运商pk
     * @param carrType 承运商类型  2 企业  3 个人
     */
    public void fleetInfoAuditSuccess(String pkCarrier, int carrType) throws Exception {
        TmsUser user = (TmsUser) SecurityUtils.getSubject().getPrincipal();
        Date date = new Date();
        String ts = DateUtils.dateToString(date, DateUtils.DATE_FORMAT_YYYYMMDDHHMMSSSSS);
        String modifyTime = DateUtils.dateToString(date, DateUtils.DEFAULT_DATE_FORMAT);
        String modifyUser = user.getPkUser();
        Map<String, Object> param = new HashMap<>();
        param.put("ts", ts);
        param.put("modifyUser", modifyUser);
        param.put("modifyTime", modifyTime);
        param.put("checkStatus", CommonUtil.audited);
        param.put("pkCarrier", pkCarrier);
        /*  6位唯一的邀请码 */
        String inviteCode = null;
        int index = -1;
        do{
          inviteCode = RandomCodeUtil.generaRandom(6);
          index =  fleetMapper.checkInviteCode(inviteCode);
        }while(index > 0);
        param.put("inviteCode",inviteCode);
        String pkUser=fleetMapper.getUserInfoByCarrPk(pkCarrier).get("pk_user");
        param.put("pkUser",pkUser);
        String roleId = nwRoleMapper.getNwRoleInfo("车队经理").getPkRole();
        param.put("pkRole",roleId);
        //个人车队审核
        if (CommonUtil.fleetPerson == carrType) {
            fleetMapper.updateFleet(param);
            nwUserRoleMapper.addPkUserRoleInfo(param);
        } else {


        }
        /*NwCorp result = corpMapper.getCorpInfoByPkCustomer(pkCustomer);
        if (StringUtils.isEmpty(result.getAddress())) {
            logger.error("货主绑定的企业信息的地址为空");
            throw new Exception();
        }
        TsAddress tsAddress = tsAddressMapper.getTsAddressInfo(result.getAddress());
        if (StringUtils.isEmpty(tsAddress)) {
            logger.error("货主审核 ts_address中不存在货主绑定的企业地址");
            throw new Exception();
        }
        String pkAddress = tsAddress.getPkAddress();
        param.put("pkAddress", pkAddress);
        String custCode = cargoOwnerMapper.getCargoInfoByCode(pkCustomer).get("cust_code");
        String pkUser = tmsUserMapper.getUserInfoByUsername(custCode).getPkUser();
        param.put("pkUser", pkUser);
        String roleId = nwRoleMapper.getNwRoleInfo("货主经理").getPkRole();
        param.put("pkRole", roleId);
        cargoOwnerMapper.updateCorp(param);
        cargoOwnerMapper.updateCust(param);
        cargoOwnerMapper.updateCustAndCorp(param);
        //is_default 1
        tsAddressMapper.updateTsCustAddrisDefault(pkAddress);
        tsAddressMapper.addTsCustAddr(param);
        nwUserRoleMapper.addPkUserRoleInfo(param);*/
    }

}
