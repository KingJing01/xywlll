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

import java.util.Map;

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

    @RequestMapping(value = "fleetInfo/{pkCarrier}/{carrType}",method = RequestMethod.POST)
    public RespMessage getFleetInfo(@PathVariable String pkCarrier,@PathVariable int carrType) {
        Map<String, String> map = null;
        try {
            map = fleetService.getFleetInfo(pkCarrier,carrType);
            return new RespMessage("成功", CommonUtil.respSuccess, map);
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage(CommonUtil.respFail);
        }
    }

    /**
     *  修改车队的状态为冻结还是解冻.
     * @param pkCarrier  承运商id
     * @param status 状态码
     * @return 返回
     */
    @RequestMapping(value = "{pkCarrier}/{status}" ,method = RequestMethod.PUT)
    public RespMessage updatelockedFlag(@PathVariable String pkCarrier, @PathVariable String status) {
        int flag = 0;
        try {
            flag = fleetService.updatelockedFlag(pkCarrier, status);
            if(CommonUtil.respSuccess ==flag) {
                return new RespMessage("操作成功",flag);
            } else {
                return new RespMessage("操作失败",flag);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new RespMessage("操作失败",CommonUtil.respFail);
        }
    }

}
