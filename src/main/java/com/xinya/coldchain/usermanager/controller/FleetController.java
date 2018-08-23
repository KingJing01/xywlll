package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.tools.repsonse.RespMessage;
import com.xinya.coldchain.usermanager.model.Fleet;
import com.xinya.coldchain.usermanager.service.FleetService;
import com.xinya.coldchain.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @RequestMapping(value = "fleetInfo/{pkCarrier}/{carrType}")
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
}
