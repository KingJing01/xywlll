package com.xinya.coldchain.beidou.model;

import java.io.Serializable;

/**
 * Created by zoushaohuai on 2019/1/25.
 */
public class MonitorRunData {

    private String plate;

    private Boolean rsa;

    private Boolean accOn;

    private Integer gnssSateliteNumber;

    private Double latitude;

    private Double marsLongitude;

    private Double speed;

    private Integer valid;

    private Integer alarmCount;

    private Double oil;

    private Integer direction;

    private Integer height;

    private Double longitude;

    private Double mileage;

    private Double marsLatitude;

    private Boolean svt80;

    private Integer accOffTime;

    private Integer signalStrength;

    private String alarms;

    private Double recordSpeed;

    private Long receiveTime;

    private Boolean supplementData;

    private String areaCode;

    private Integer stayDuration;

    private Boolean fixed;

    private Integer accOnTime;

    private Long status;

    private String tick;

    private String vehicleId;

    private Double fuelLevel;

    private Double coolantLevel;

    private Double engineOilTemperature;

    private Double engineRev;

    private Double inLetTemperature;

    private Double speed2;

    private Double accumulativeMileage;

    private Double averageFuelConsumption;

    private Double coolantTemperature;

    private Double braking;

    private Double brakeSubSensitive;

    private Double fuelTemperature;

    private Double instantaneousFuelConsumption;

    private Double inLetPressure;

    private Double brakingLength;

    private Double voltage;

    private Double throttleRatio;

    private Double ureaTankLevel;

    private Double clutch;

    private Double fuelPressure;

    private Double accumulativeFuel;

    private Double currentGear;

    private Double engineFuelRate;

    private Double torqueRatio;

    private Double engineOilPressure;

    private Double engineTime;

    private Double ureaTankTemperature;

    private Double temperature1;

    private Double temperature2;

    private Double temperature3;

    private Double temperature4;

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate == null ? null : plate.trim();
    }

    public Boolean getRsa() {
        return rsa;
    }

    public void setRsa(Boolean rsa) {
        this.rsa = rsa;
    }

    public Boolean getAccOn() {
        return accOn;
    }

    public void setAccOn(Boolean accOn) {
        this.accOn = accOn;
    }

    public Integer getGnssSateliteNumber() {
        return gnssSateliteNumber;
    }

    public void setGnssSateliteNumber(Integer gnssSateliteNumber) {
        this.gnssSateliteNumber = gnssSateliteNumber;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getMarsLongitude() {
        return marsLongitude;
    }

    public void setMarsLongitude(Double marsLongitude) {
        this.marsLongitude = marsLongitude;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }

    public Integer getValid() {
        return valid;
    }

    public void setValid(Integer valid) {
        this.valid = valid;
    }

    public Integer getAlarmCount() {
        return alarmCount;
    }

    public void setAlarmCount(Integer alarmCount) {
        this.alarmCount = alarmCount;
    }

    public Double getOil() {
        return oil;
    }

    public void setOil(Double oil) {
        this.oil = oil;
    }

    public Integer getDirection() {
        return direction;
    }

    public void setDirection(Integer direction) {
        this.direction = direction;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getMileage() {
        return mileage;
    }

    public void setMileage(Double mileage) {
        this.mileage = mileage;
    }

    public Double getMarsLatitude() {
        return marsLatitude;
    }

    public void setMarsLatitude(Double marsLatitude) {
        this.marsLatitude = marsLatitude;
    }

    public Boolean getSvt80() {
        return svt80;
    }

    public void setSvt80(Boolean svt80) {
        this.svt80 = svt80;
    }

    public Integer getAccOffTime() {
        return accOffTime;
    }

    public void setAccOffTime(Integer accOffTime) {
        this.accOffTime = accOffTime;
    }

    public Integer getSignalStrength() {
        return signalStrength;
    }

    public void setSignalStrength(Integer signalStrength) {
        this.signalStrength = signalStrength;
    }

    public String getAlarms() {
        return alarms;
    }

    public void setAlarms(String alarms) {
        this.alarms = alarms == null ? null : alarms.trim();
    }

    public Double getRecordSpeed() {
        return recordSpeed;
    }

    public void setRecordSpeed(Double recordSpeed) {
        this.recordSpeed = recordSpeed;
    }

    public Long getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(Long receiveTime) {
        this.receiveTime = receiveTime;
    }

    public Boolean getSupplementData() {
        return supplementData;
    }

    public void setSupplementData(Boolean supplementData) {
        this.supplementData = supplementData;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode == null ? null : areaCode.trim();
    }

    public Integer getStayDuration() {
        return stayDuration;
    }

    public void setStayDuration(Integer stayDuration) {
        this.stayDuration = stayDuration;
    }

    public Boolean getFixed() {
        return fixed;
    }

    public void setFixed(Boolean fixed) {
        this.fixed = fixed;
    }

    public Integer getAccOnTime() {
        return accOnTime;
    }

    public void setAccOnTime(Integer accOnTime) {
        this.accOnTime = accOnTime;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public String getTick() {
        return tick;
    }

    public void setTick(String tick) {
        this.tick = tick == null ? null : tick.trim();
    }

    public String getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(String vehicleId) {
        this.vehicleId = vehicleId == null ? null : vehicleId.trim();
    }

    public Double getFuelLevel() {
        return fuelLevel;
    }

    public void setFuelLevel(Double fuelLevel) {
        this.fuelLevel = fuelLevel;
    }

    public Double getCoolantLevel() {
        return coolantLevel;
    }

    public void setCoolantLevel(Double coolantLevel) {
        this.coolantLevel = coolantLevel;
    }

    public Double getEngineOilTemperature() {
        return engineOilTemperature;
    }

    public void setEngineOilTemperature(Double engineOilTemperature) {
        this.engineOilTemperature = engineOilTemperature;
    }

    public Double getEngineRev() {
        return engineRev;
    }

    public void setEngineRev(Double engineRev) {
        this.engineRev = engineRev;
    }

    public Double getInLetTemperature() {
        return inLetTemperature;
    }

    public void setInLetTemperature(Double inLetTemperature) {
        this.inLetTemperature = inLetTemperature;
    }

    public Double getSpeed2() {
        return speed2;
    }

    public void setSpeed2(Double speed2) {
        this.speed2 = speed2;
    }

    public Double getAccumulativeMileage() {
        return accumulativeMileage;
    }

    public void setAccumulativeMileage(Double accumulativeMileage) {
        this.accumulativeMileage = accumulativeMileage;
    }

    public Double getAverageFuelConsumption() {
        return averageFuelConsumption;
    }

    public void setAverageFuelConsumption(Double averageFuelConsumption) {
        this.averageFuelConsumption = averageFuelConsumption;
    }

    public Double getCoolantTemperature() {
        return coolantTemperature;
    }

    public void setCoolantTemperature(Double coolantTemperature) {
        this.coolantTemperature = coolantTemperature;
    }

    public Double getBraking() {
        return braking;
    }

    public void setBraking(Double braking) {
        this.braking = braking;
    }

    public Double getBrakeSubSensitive() {
        return brakeSubSensitive;
    }

    public void setBrakeSubSensitive(Double brakeSubSensitive) {
        this.brakeSubSensitive = brakeSubSensitive;
    }

    public Double getFuelTemperature() {
        return fuelTemperature;
    }

    public void setFuelTemperature(Double fuelTemperature) {
        this.fuelTemperature = fuelTemperature;
    }

    public Double getInstantaneousFuelConsumption() {
        return instantaneousFuelConsumption;
    }

    public void setInstantaneousFuelConsumption(Double instantaneousFuelConsumption) {
        this.instantaneousFuelConsumption = instantaneousFuelConsumption;
    }

    public Double getInLetPressure() {
        return inLetPressure;
    }

    public void setInLetPressure(Double inLetPressure) {
        this.inLetPressure = inLetPressure;
    }

    public Double getBrakingLength() {
        return brakingLength;
    }

    public void setBrakingLength(Double brakingLength) {
        this.brakingLength = brakingLength;
    }

    public Double getVoltage() {
        return voltage;
    }

    public void setVoltage(Double voltage) {
        this.voltage = voltage;
    }

    public Double getThrottleRatio() {
        return throttleRatio;
    }

    public void setThrottleRatio(Double throttleRatio) {
        this.throttleRatio = throttleRatio;
    }

    public Double getUreaTankLevel() {
        return ureaTankLevel;
    }

    public void setUreaTankLevel(Double ureaTankLevel) {
        this.ureaTankLevel = ureaTankLevel;
    }

    public Double getClutch() {
        return clutch;
    }

    public void setClutch(Double clutch) {
        this.clutch = clutch;
    }

    public Double getFuelPressure() {
        return fuelPressure;
    }

    public void setFuelPressure(Double fuelPressure) {
        this.fuelPressure = fuelPressure;
    }

    public Double getAccumulativeFuel() {
        return accumulativeFuel;
    }

    public void setAccumulativeFuel(Double accumulativeFuel) {
        this.accumulativeFuel = accumulativeFuel;
    }

    public Double getCurrentGear() {
        return currentGear;
    }

    public void setCurrentGear(Double currentGear) {
        this.currentGear = currentGear;
    }

    public Double getEngineFuelRate() {
        return engineFuelRate;
    }

    public void setEngineFuelRate(Double engineFuelRate) {
        this.engineFuelRate = engineFuelRate;
    }

    public Double getTorqueRatio() {
        return torqueRatio;
    }

    public void setTorqueRatio(Double torqueRatio) {
        this.torqueRatio = torqueRatio;
    }

    public Double getEngineOilPressure() {
        return engineOilPressure;
    }

    public void setEngineOilPressure(Double engineOilPressure) {
        this.engineOilPressure = engineOilPressure;
    }

    public Double getEngineTime() {
        return engineTime;
    }

    public void setEngineTime(Double engineTime) {
        this.engineTime = engineTime;
    }

    public Double getUreaTankTemperature() {
        return ureaTankTemperature;
    }

    public void setUreaTankTemperature(Double ureaTankTemperature) {
        this.ureaTankTemperature = ureaTankTemperature;
    }

    public Double getTemperature1() {
        return temperature1;
    }

    public void setTemperature1(Double temperature1) {
        this.temperature1 = temperature1;
    }

    public Double getTemperature2() {
        return temperature2;
    }

    public void setTemperature2(Double temperature2) {
        this.temperature2 = temperature2;
    }

    public Double getTemperature3() {
        return temperature3;
    }

    public void setTemperature3(Double temperature3) {
        this.temperature3 = temperature3;
    }

    public Double getTemperature4() {
        return temperature4;
    }

    public void setTemperature4(Double temperature4) {
        this.temperature4 = temperature4;
    }
}