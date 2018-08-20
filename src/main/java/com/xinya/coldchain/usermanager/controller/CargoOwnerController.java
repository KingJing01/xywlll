package com.xinya.coldchain.usermanager.controller;

import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.tools.repsonse.RespMessage;
import com.xinya.coldchain.usermanager.model.CargoOwner;
import com.xinya.coldchain.usermanager.service.CargoOwnerService;
import com.xinya.coldchain.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


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

    /**
     * 获取列表数据和搜索功能.
     *
     * @param pageSize   页大小
     * @param pageNumber 页号
     * @param custCode   搜索字段
     * @return 返回
     */
    @RequestMapping(value = "get_list_data")
    public PageInfo<CargoOwner> getListData(int pageSize, int pageNumber, String custCode) {
        return cargoOwnerService.getListData(pageSize, pageNumber, custCode);
    }

    /**
     * 删除货主信息  更新dr字段为1
     *
     * @param id 货主 pkCustomer
     * @return 返回
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public RespMessage deleteinfo(@PathVariable String id) {
        int flag = cargoOwnerService.updateDrStatus(id);
        return new RespMessage(flag);
    }

    /**
     * 冻结货主信息  更新check_status 4
     *
     * @param id 货主 pkCustomer
     * @return 返回
     */
    @RequestMapping(value = "/{id}/{status}", method = RequestMethod.PUT)
    public RespMessage updatelockedFlag(@PathVariable String id, @PathVariable String status) {
        int flag = 0;
        try {
            flag = cargoOwnerService.updatelockedFlag(id, status);
            return new RespMessage(flag);
        } catch (Exception e) {
            return new RespMessage(CommonUtil.respFail);
        }
    }

    /**
     * 查看货主的基本信息
     * @param pkCustomer 货主id
     * @return 返回
     */
    @RequestMapping(value = "/cargeinfo/{pkCustomer}", method = RequestMethod.POST)
    public RespMessage getCargoInfoByCode(@PathVariable String pkCustomer) {
        Map<String, String> map = null;
        try {
            map = cargoOwnerService.getCargoInfoByCode(pkCustomer);
            return new RespMessage("成功", CommonUtil.respSuccess, map);
        } catch (Exception e) {
            return new RespMessage(CommonUtil.respFail);
        }
    }

}
