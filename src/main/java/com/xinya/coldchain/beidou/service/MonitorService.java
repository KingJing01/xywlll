package com.xinya.coldchain.beidou.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xinya.coldchain.beidou.mapper.MonitorMapper;
import com.xinya.coldchain.beidou.model.MonitorRunData;
import com.xinya.coldchain.tools.RestEasyServcie;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zoushaohuai on 2019/1/28.
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class MonitorService {

    private static Logger logger = LoggerFactory.getLogger(com.xinya.coldchain.beidou.service.MonitorService.class);
    @Autowired
    private MonitorMapper monitorMapper;
    public final String bdUrl = "http://www.hstsp.com/api/openPlatformController/";
    public final String client_id = "&client_id=000007";
    public final String client_secret = "&client_secret=c8a2f4e4-7696-42b7-88d6-09266c5f1b6e";
    public final String secret_key = "&client_id=000007&client_secret=c8a2f4e4-7696-42b7-88d6-09266c5f1b6e";

    /**
     * 插入北斗的监控数据
     */
    public void insertMonitorRunData() throws Exception {

        String url = bdUrl + "queryVehicleOperatingDataByHbase?"
                + "vehicleId=1029319149058837395"
                + "&beginDate=" + getTime().get("beginTime")
                + "&endDate=" + getTime().get("endTime")
                + secret_key;
        //System.out.println(url);
        String value = RestEasyServcie.get(url);

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = null;
        List<Map<String, Object>> dataList = new ArrayList<>();
        MonitorRunData runData = new MonitorRunData();
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
            Map<String, Object> result = new HashMap<>();
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
                Map<String, Object> sensor1 = (Map)sensorList.get(0);
                Map<String, Object> sensor2 = (Map)sensorList.get(1);
                Map<String, Object> sensor3 = (Map)sensorList.get(2);
                Map<String, Object> sensor4 = (Map)sensorList.get(3);
                result.put("temperature1",sensor1.get("sensorValue"));
                result.put("temperature2",sensor2.get("sensorValue"));
                result.put("temperature3",sensor3.get("sensorValue"));
                result.put("temperature4",sensor4.get("sensorValue"));
            }
            runData.setGnssSateliteNumber((Integer)result.get("gnssSatelliteNumber"));
            runData.setCoolantLevel((Double)result.get("coolantLevel"));
            runData.setAccumulativeMileage((Double)result.get("accumulativeMileage"));
            runData.setAverageFuelConsumption((Double)result.get("averagefuelConsumption"));
            runData.setBraking((Double)result.get("braking"));
            runData.setInstantaneousFuelConsumption((Double)result.get("instantaneousFuelConsumption"));
            runData.setHeight((Integer)result.get("height"));
            runData.setLongitude((Double)result.get("longitude"));
            runData.setMileage((Double)result.get("mileage"));
            runData.setMarsLatitude((Double)result.get("marsLatitude"));
            runData.setSvt80((Boolean)result.get("svt80"));
            runData.setAccOffTime((Integer)result.get("accOffTime"));
            runData.setTick(result.get("tick").toString());
            runData.setBrakingLength((Double)result.get("brakingLength"));
            runData.setRecordSpeed((Double)result.get("recordSpeed"));
            runData.setSupplementData((Boolean)result.get("supplementData"));
            runData.setAreaCode(result.get("areaCode") == null ? null : result.get("areaCode").toString());
            runData.setStayDuration((Integer)result.get("stayDuration"));
            runData.setClutch((Double)result.get("clutch"));
            runData.setAccumulativeFuel((Double)result.get("accumulativeFuel"));
            runData.setFixed((Boolean)result.get("fixed"));
            runData.setTorqueRatio((Double)result.get("torqueRatio"));
            runData.setEngineOilPressure((Double)result.get("engineOilPressure"));
            runData.setUreaTankTemperature((Double)result.get("ureaTankTemperature"));
            runData.setAccOnTime((Integer)result.get("accOnTime"));
            runData.setStatus(Long.valueOf(result.get("status").toString()));
            runData.setRsa((Boolean)result.get("rsa"));
            runData.setFuelLevel((Double)result.get("fuelLevel"));
            runData.setAccOn((Boolean)result.get("accOn"));
            runData.setEngineOilTemperature((Double)result.get("engineOilTemperature"));
            runData.setLatitude((Double)result.get("latitude"));
            runData.setPlate(result.get("plate").toString());
            runData.setMarsLongitude((Double)result.get("marsLongitude"));
            runData.setEngineRev((Double)result.get("engineRev"));
            runData.setInLetTemperature((Double)result.get("inletTemperature"));
            runData.setSpeed((Double)result.get("speed"));
            runData.setValid((Integer)result.get("valid"));
            runData.setAlarmCount((Integer)result.get("alarmCount"));
            runData.setOil((Double)result.get("oil"));
            runData.setTemperature4((Double)result.get("temperature4"));
            runData.setTemperature3((Double)result.get("temperature3"));
            runData.setTemperature2((Double)result.get("temperature2"));
            runData.setTemperature1((Double)result.get("temperature1"));
            runData.setVehicleId(result.get("vehicleId").toString());
            runData.setCoolantTemperature((Double)result.get("coolantTemperature"));
            runData.setBrakeSubSensitive((Double)result.get("brakeSubsensitive"));
            runData.setFuelTemperature((Double)result.get("fuelTemperature"));
            runData.setDirection((Integer)result.get("direction"));
            runData.setSignalStrength((Integer)result.get("signalStrength"));
            runData.setAlarms(result.get("alarms") == null ? null : result.get("alarms").toString());
            runData.setInLetPressure((Double)result.get("inletPressure"));
            runData.setVoltage((Double)result.get("voltage"));
            runData.setReceiveTime(Long.valueOf(result.get("receiveTime").toString()));
            runData.setThrottleRatio((Double)result.get("throttleRatio"));
            runData.setUreaTankLevel((Double)result.get("ureaTankLevel"));
            runData.setFuelPressure((Double)result.get("fuelPressure"));
            runData.setCurrentGear((Double)result.get("currentGear"));
            runData.setEngineFuelRate((Double)result.get("engineFuelRate"));
            runData.setEngineTime((Double)result.get("engineTime"));
            monitorMapper.insert(runData);
        }
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
