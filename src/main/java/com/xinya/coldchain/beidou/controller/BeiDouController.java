package com.xinya.coldchain.beidou.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xinya.coldchain.xinya.RestEasyServcie;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 北斗接口访问数据Controller
 *
 * @author liyoujing
 */
@RestController
@RequestMapping(value = "/beidou")
public class BeiDouController {

    public final String bdUrl = "http://139.224.65.40/gpsAPi/gpsapi.ashx?method=";

    /**
     *
     * @param pageable 分页对象
     * @return 返回车辆信息的list
     * @deprecated 获取当前北斗用户下所有的车辆信息.
     */
    @RequestMapping(value = "/get_vechicel_data_all")
    public Map<String, Object> getVechicelDataAll(SpringDataWebProperties.Pageable pageable) {
        String url = bdUrl + "LoadUserVehicles&username=xywl1&pwd=987987";
        String value = RestEasyServcie.get(url);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = null;
        List<Map<String, String>> dataList = new ArrayList<>();
        try {
            map = objectMapper.readValue(value, Map.class);
            if (!StringUtils.isEmpty(map.get("Data"))) {
                dataList = (ArrayList) map.get("Data");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("total",dataList.size());
        resultMap.put("rows",dataList);
        return resultMap;
    }

    @RequestMapping(value = "/get_vechiecl_data_by_no")
    public String getVechicelDataByDevNo(String deviceNo) {
        String url = bdUrl + "LoadVehiclePostion&systemno=" + deviceNo;
        return RestEasyServcie.get(url);
    }

    @RequestMapping(value = "/get_vechicel_gps_all")
    public Map<String, Object> getVechicelGpsAll() {
        String url = bdUrl + "LoadAllVehiclesPostion&uid=45e9bde6-041b-4ccf-87c3-65e9b0541fa3&grade=2";
        String resp = RestEasyServcie.get(url);
        Map<String, String> map = new HashMap<>();
        try {
            return new ObjectMapper().readValue(resp, Map.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
