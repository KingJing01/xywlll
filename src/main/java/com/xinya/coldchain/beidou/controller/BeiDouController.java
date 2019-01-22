package com.xinya.coldchain.beidou.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.xinya.coldchain.tools.RestEasyServcie;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 北斗接口访问数据Controller
 *
 * @author liyoujing
 */
@RestController
@RequestMapping(value = "/beidou")
public class BeiDouController {

    public final String bdUrl = "http://www.hstsp.com/api/openPlatformController/";
    public final String client_id = "&client_id=000007";
    public final String client_secret = "&client_secret=c8a2f4e4-7696-42b7-88d6-09266c5f1b6e";
    public final String secret_key = "&client_id=000007&client_secret=c8a2f4e4-7696-42b7-88d6-09266c5f1b6e";
    // public final String secret_key = client_id + client_secret;

    /**
     *
     * @param pageable 分页对象
     * @return 返回车辆信息的list
     * @deprecated 车辆基础数据接口.
     */
    @RequestMapping(value = "/queryVehicleList")
    public Map<String, Object> queryVehicleList(Pageable pageable) {
        String url = bdUrl + "queryVehicleList?enterpriseCode=a0110238" + secret_key;
        String value = RestEasyServcie.get(url);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = null;
        List<Map<String, String>> dataList = new ArrayList<>();
        try {
            map = objectMapper.readValue(value, Map.class);
            if (!StringUtils.isEmpty(map.get("data"))) {
                dataList = (ArrayList) map.get("data");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("total",dataList.size());
        resultMap.put("list",dataList);
        return resultMap;
    }
    /**
     * @return 返回车辆信息
     * @deprecated 车辆实时数据接口.
     */
    @RequestMapping(value = "/queryVehicleBasicData")
    public Map<String, Object> queryVehicleBasicData(String deviceNo) {
        String url = bdUrl + "queryVehicleBasicData?vehicleId=1029319149058837395" + secret_key;;
        String value = RestEasyServcie.get(url);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = null;
        //List<Map<String, String>> dataList = new ArrayList<>();
        Map<String, Object> resultMap = new HashMap<>();
        try {
            map = objectMapper.readValue(value, Map.class);
            if (!StringUtils.isEmpty(map.get("data"))) {
                resultMap = (HashMap) map.get("data");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        //Map<String, Object> resultMap = new HashMap<>();
        return resultMap;
    }
    /**
     * @return 返回车辆信息
     * @deprecated 车辆运行和状态接口
     */
    @RequestMapping(value = "/queryVehicleOperatingDataByHbase")
    public Map<String, Object> queryVehicleOperatingDataByHbase() {
        String url = bdUrl + "queryVehicleOperatingDataByHbase?"
                + "vehicleId=1029319149058837395"
                + "&beginDate=" + getTime().get("beginTime")
                + "&endDate=" + getTime().get("endTime")
                + secret_key;
        String value = RestEasyServcie.get(url);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = null;
        List<Map<String, Object>> dataList = new ArrayList<>();
        try {
            map = objectMapper.readValue(value, Map.class);
            if (!StringUtils.isEmpty(map.get("data"))) {
                dataList = (ArrayList) map.get("data");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<Map<String, String>> resultList = new ArrayList<>();
        for (Map<String, Object> item : dataList){
                Map<String, String> result = new HashMap<>();
                if(!StringUtils.isEmpty(item.get("gpsWrapperInfo"))){
                    result.putAll((Map)item.get("gpsWrapperInfo"));
                }
                if(!StringUtils.isEmpty(item.get("historyRowKeyWrapperInfo"))){
                    result.putAll((Map)item.get("historyRowKeyWrapperInfo"));
                }
                if(!StringUtils.isEmpty(item.get("canWrapperInfo"))){
                    result.putAll((Map)item.get("canWrapperInfo"));
                }
                if(!StringUtils.isEmpty(item.get("youWeiTemperatureBeans"))){
                    List<Map> sensorList = (List)item.get("youWeiTemperatureBeans");
                    Map<String, String> sensor1 = (Map)sensorList.get(0);
                    Map<String, String> sensor2 = (Map)sensorList.get(1);
                    Map<String, String> sensor3 = (Map)sensorList.get(2);
                    Map<String, String> sensor4 = (Map)sensorList.get(3);
                    result.put("temperature1",sensor1.get("sensorValue"));
                    result.put("temperature2",sensor2.get("sensorValue"));
                    result.put("temperature3",sensor3.get("sensorValue"));
                    result.put("temperature4",sensor4.get("sensorValue"));
                }
                resultList.add(result);
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("total",resultList.size());
        resultMap.put("list",resultList);
        return resultMap;
    }
    /**
     * @return 返回车辆信息
     * @deprecated 车辆行程信息接口
     */
    @RequestMapping(value = "/queryVehicleJourneyByMyCat")
    public Map<String, Object> queryVehicleJourneyByMyCat() {
        String url = bdUrl + "queryVehicleJourneyByMyCat?enterpriseCode=a0110072&vehicleId=1029319149058837395&beginTime=2019-01-18%2017:47:00&endTime=2019-01-18%2017:47:59" + secret_key;;
        String value = RestEasyServcie.get(url);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = null;
        List<Map<String, String>> dataList = new ArrayList<>();
        try {
            map = objectMapper.readValue(value, Map.class);
            if (!StringUtils.isEmpty(map.get("data"))) {
                dataList = (ArrayList) map.get("data");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("total",dataList.size());
        resultMap.put("list",dataList);
        return resultMap;
    }
    /**
     * @return 返回车辆停车记录
     * @deprecated 车辆停车信息接口
     */
    @RequestMapping(value = "/queryVehicleParkingByMyCat")
    public Map<String, Object> queryVehicleParkingByMyCat() {
        String url = bdUrl + "queryVehicleParkingByMyCat?enterpriseCode=a0110072&vehicleId=1029319149058837395&beginTime=2019-01-18%2017:47:00&endTime=2019-01-18%2017:47:59" + secret_key;
        String value = RestEasyServcie.get(url);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = null;
        List<Map<String, String>> dataList = new ArrayList<>();
        try {
            map = objectMapper.readValue(value, Map.class);
            if (!StringUtils.isEmpty(map.get("data"))) {
                dataList = (ArrayList) map.get("data");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("total",dataList.size());
        resultMap.put("list",dataList);
        return resultMap;
    }

    private Map<String,String> getTime(){
        Map<String, String> resultMap = new HashMap<>();
        Calendar c = Calendar.getInstance();
        SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        resultMap.put("endTime",sdf.format(c.getTime()));

        c.add(Calendar.SECOND, -30);
        resultMap.put("beginTime",sdf.format(c.getTime()));

        return resultMap;
    }
}
