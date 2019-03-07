package com.xinya.coldchain.utils;

/**
 * @author liyoujing
 * @create 2018-08-02 下午 02:26
 * @desc 监控系统通用后台参数
 **/
public class CommonUtil {

    //public static final String WSDLUrl = "http://222.73.159.76:8089/tms/services/ElecSignageEndPoint?wsdl";
    public static final String WSDLUrl = "http://39.98.34.129:8089/tms//services/ElecSignageEndPoint?wsdl";
    //public static final String WSDLUrl = "http://47.97.214.8:8080/tms-webapp/services/ElecSignageEndPoint?wsdl";

    //public static final String WSDLNameSpace = "http://222.73.159.76:8089/tms/services/ElecSignageEndPoint";
    public static final String WSDLNameSpace = "http://39.98.34.129:8089/tms//services/ElecSignageEndPoint";
    //public static final String WSDLNameSpace = "http://47.97.214.8:8080/tms-webapp/services/ElecSignageEndPoint";

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

    public static  int respSuccess = 1;

    public static  int respFail = 0;
    //未上传审核资料
    public static int auditNever = 0;
    //待审核
    public static int auditWaited = 1;
    //已审核
    public static int audited = 2;
    //审核驳回
    public static int auditReject = 3;
    /*车队类型*/
    public static int fleetEmp = 2;

    public static int fleetPerson = 3;
}
