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

    /**
     *  获取司机信息列表和搜索
     * @param pageSize 一页大小
     * @param pageNumber 页号
     * @param code 司机编码
     * @return 返回
     */
    @RequestMapping(value = "get_list_data")
    public PageInfo<Driver> getListData(int pageSize, int pageNumber, String code) {
       return driverService.getListData(pageSize,pageNumber,code);
    }

    /**
     * 获取司机的信息
     * @param pkDriver 司机pk
     * @return 返回
     */
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


    /**
     * 审核驳回.
     * @param pkDriver 司机pk
     * @param reason  驳回原因
     * @return 返回
     */
    @RequestMapping(value = "/driver_reject/{pkDriver}",method = RequestMethod.POST)
    public RespMessage driverAuditReject(@PathVariable String pkDriver,String reason) {
        try {
            driverService.driverAuditReject(pkDriver,reason);
            return new RespMessage("成功驳回",CommonUtil.respSuccess);
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage("驳回失败",CommonUtil.respFail);
        }
    }
}
