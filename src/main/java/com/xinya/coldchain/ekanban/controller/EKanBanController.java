package com.xinya.coldchain.ekanban.controller;

import com.xinya.coldchain.ekanban.service.EKanBanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-02 下午 02:08
 * @desc 电子看板控制层
 **/
@RestController
@RequestMapping(value = "ekan")
public class EKanBanController {

    @Autowired
    private EKanBanService eKanBanService;

    /**
     * 提货率
     * @param status 近7天 近一个月 近半年的判断位
     * @return 返回tms数据
     */
    @RequestMapping(value = "pick_up_rate")
    public Map<String, Object> getPickUpRate(String status) {
        return eKanBanService.getPickUpRate(status);
    }

    /**
     * 到货率
     * @param status 近7天 近一个月 近半年的判断位
     * @return 返回tms数据
     */
    @RequestMapping(value = "arrival_rate")
    public Map<String, Object> getArrivalRate(String status) {
        return eKanBanService.getArrivalRate(status);
    }

    /**
     * 异常分布情况
     * @return 返回tms数据
     */
    @RequestMapping(value = "exception_distribute")
    public Map<String, Object> getExceptionDistribute() {
        return null;
    }

}



