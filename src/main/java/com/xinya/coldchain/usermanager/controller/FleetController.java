package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.tools.repsonse.RespMessage;
import com.xinya.coldchain.usermanager.model.Fleet;
import com.xinya.coldchain.usermanager.service.FleetService;
import com.xinya.coldchain.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 车队信息
 *
 * @author liyoujing
 */
@RestController
@RequestMapping(value = "fleet")
public class FleetController {

    @Autowired
    private FleetService fleetService;

    /**
     * 获取车队信息.
     *
     * @param pageSize   页大小
     * @param pageNumber 页号
     * @param code       查询码
     * @param sort       排序字段
     * @param order      排序顺序
     * @return 返回
     */
    @RequestMapping(value = "get_list_data")
    public PageInfo<Fleet> getListData(int pageSize, int pageNumber, String code, String sort, String order) {
        return fleetService.getListData(pageSize, pageNumber, code, sort, order);
    }

    @RequestMapping(value = "fleetInfo/{pkCarrier}/{carrType}", method = RequestMethod.POST)
    public RespMessage getFleetInfo(@PathVariable String pkCarrier, @PathVariable int carrType) {
        Map<String, String> map = null;
        try {
            map = fleetService.getFleetInfo(pkCarrier, carrType);
            return new RespMessage("成功", CommonUtil.respSuccess, map);
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage(CommonUtil.respFail);
        }
    }

    /**
     * 修改车队的状态为冻结还是解冻.
     *
     * @param pkCarrier 承运商id
     * @param status    状态码
     * @return 返回
     */
    @RequestMapping(value = "{pkCarrier}/{status}", method = RequestMethod.PUT)
    public RespMessage updatelockedFlag(@PathVariable String pkCarrier, @PathVariable String status) {
        int flag = 0;
        try {
            flag = fleetService.updatelockedFlag(pkCarrier, status);
            if (CommonUtil.respSuccess == flag) {
                return new RespMessage("操作成功", flag);
            } else {
                return new RespMessage("操作失败", flag);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage("操作失败", CommonUtil.respFail);
        }
    }

    /**
     * 审核驳回.
     *
     * @param pkCarrier 承运商pk
     * @param reason    驳回原因
     * @return 返回
     */
    @RequestMapping(value = "/fleet_reject/{pkCarrier}", method = RequestMethod.POST)
    public RespMessage fleetInfoReject(@PathVariable String pkCarrier, String reason) {
        try {
            fleetService.fleetInfoReject(pkCarrier, reason);
            return new RespMessage("成功驳回", CommonUtil.respSuccess);
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage("驳回失败", CommonUtil.respFail);
        }
    }

    /**
     * 审核成功
     * 个人车队，直接更新ts_carrier的状态
     * 企业车队  ts_re_carr_corp 承运商和公司关系表
     * 当公司表create_user就是企业承运商nw_user的pk_user 说明是第一关系  进行正常审核的流程
     * 当前审核的承运商nw_user的pk_user不等于公司表create_user 判断公司审核状态 公司已审核，进行正常的审核流程，赋予角色
     * 公司未审核，当前审核直接驳回，进行提示
     *
     * @param pkCarrier 承运商pk
     * @return 返回
     */
    @RequestMapping(value = "/fleet_audit/{pkCarrier}/{carrType}", method = RequestMethod.POST)
    public RespMessage fleetInfoAuditSuccess(@PathVariable String pkCarrier, @PathVariable int carrType) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result = fleetService.fleetInfoAuditSuccess(pkCarrier, carrType);
            return new RespMessage(result.get("message").toString(), (int) result.get("flag"));
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage("审核失败", CommonUtil.respFail);
        }

    }
}
