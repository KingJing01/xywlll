package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.tools.repsonse.RespMessage;
import com.xinya.coldchain.usermanager.model.Driver;
import com.xinya.coldchain.usermanager.service.DriverService;
import com.xinya.coldchain.usermanager.service.FleetService;
import com.xinya.coldchain.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * 司机端信息审核.
 *
 * @author liyoujing
 */
@RestController
@RequestMapping(value = "driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    /**
     * 获取司机信息列表和搜索
     *
     * @param pageSize   一页大小
     * @param pageNumber 页号
     * @param code       司机编码
     * @param sort       排序字段
     * @param order      排序顺序
     * @return 返回
     */
    @RequestMapping(value = "get_list_data")
    public PageInfo<Driver> getListData(int pageSize, int pageNumber, String code,String sort, String order) {
        return driverService.getListData(pageSize, pageNumber, code,sort,order);
    }

    /**
     * 获取司机的信息
     *
     * @param pkDriver 司机pk
     * @return 返回
     */
    @RequestMapping(value = "/driverInfo/{pkDriver}", method = RequestMethod.POST)
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

    /**
     * 审核驳回.
     *
     * @param pkDriver 司机pk
     * @param reason   驳回原因
     * @return 返回
     */
    @RequestMapping(value = "/driver_reject/{pkDriver}", method = RequestMethod.POST)
    public RespMessage driverAuditReject(@PathVariable String pkDriver, String reason) {
        try {
            driverService.driverAuditReject(pkDriver, reason);
            return new RespMessage("成功驳回", CommonUtil.respSuccess);
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage("驳回失败", CommonUtil.respFail);
        }
    }

    /**
     * 审核成功. 判断车队是否已经审核成功，车队不成功，司机也不成功.
     *
     * @param pkDriver 司机pk
     * @return 返回
     */
    @RequestMapping(value = "/driver_audit/{pkDriver}", method = RequestMethod.POST)
    public RespMessage driverAuditSuccess(@PathVariable String pkDriver) {
        List<Map<String,Object>> list = driverService.getCarrierCheckStatus(pkDriver);
        if (list.size() > 1) {
            return new RespMessage("当前司机已绑定了承运商,请联系司机或客服", CommonUtil.respFail);
        }
        if (CommonUtil.audited != (int)list.get(0).get("check_status")) {
            return new RespMessage("承运商信息未成功审核，承运商下的司机无法审核", CommonUtil.respFail);
        }
        try {
            driverService.driverAuditSuccess(pkDriver);
            return new RespMessage("审核成功", CommonUtil.respSuccess);
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage("审核失败", CommonUtil.respFail);
        }

    }


}
