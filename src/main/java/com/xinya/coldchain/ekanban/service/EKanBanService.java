package com.xinya.coldchain.ekanban.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * @author liyoujing
 * @create 2018-08-02 下午 02:17
 * @desc 电子看板service
 **/
@Service(value = "eKanBanService")
@Transactional
public class EKanBanService {

    public Map<String, Object> getPickUpRate(String status) {
        return null;
    }


    public Map<String, Object> getArrivalRate(String status) {
        return null;
    }
}
