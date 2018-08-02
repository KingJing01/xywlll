package com.xinya.coldchain.utils;

/**
 * @author liyoujing
 * @create 2018-08-02 下午 02:26
 * @desc 监控系统通用后台参数
 **/
public class CommonUtil {

    public static final String WSDLUrl = "http://127.0.0.1:8080/tms-webapp/services/ElecSignageEndPoint?wsdl";

    public static final String WSDLNameSpace = "http://127.0.0.1:8080/tms-webapp/services/ElecSignageEndPoint";

    //tms webservice 方法名
    // 到货准点率
    public static final String TMS_ARRIONTIME ="arriOnTime";
    // 提货准点率
    public static final String TMS_DELIONTIME ="deliOnTime";
    // 异常分布
    public static final String TMS_EXPTYPEDISTRI ="expTypeDistri";
    //上月订单总量
    public static final String TMS_LASTMONTH ="lastMonth";
    //昨日到货订单
    public static final String TMS_YESTERDAYARRIVALBILLS ="yesterdayArrivalBills";
    //昨日订单总量
    public static final String TMS_YESTERDAYBILLS ="yesterdayBills";
    //昨日提货订单
    public static final String TMS_YESTERDAYDELIBILLS ="yesterdayDeliBills";
}
