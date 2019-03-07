package com.xinya.coldchain.ekanban.service;

import com.xinya.coldchain.utils.CommonUtil;
import com.xinya.coldchain.utils.WebServicesUtils;
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
        return WebServicesUtils.invokeWS(CommonUtil.WSDLUrl,
                CommonUtil.WSDLNameSpace,CommonUtil.TMS_DELIONTIME,new Object []{status});
    }


    public Map<String, Object> getArrivalRate(String status) {
        return WebServicesUtils.invokeWS(CommonUtil.WSDLUrl,
                CommonUtil.WSDLNameSpace,CommonUtil.TMS_ARRIONTIME,new Object []{status});
    }

    public Map<String, Object> getExceptionDistribute() {
        return WebServicesUtils.invokeWS(CommonUtil.WSDLUrl,
                CommonUtil.WSDLNameSpace,CommonUtil.TMS_EXPTYPEDISTRI,null);
    }

    public Map<String, Object> getDayArrival() {
        return WebServicesUtils.invokeWS(CommonUtil.WSDLUrl,
                CommonUtil.WSDLNameSpace,CommonUtil.TMS_YESTERDAYARRIVALBILLS,null);
    }

    public Map<String, Object> getDayPick() {
        return  WebServicesUtils.invokeWS(CommonUtil.WSDLUrl,
                CommonUtil.WSDLNameSpace,CommonUtil.TMS_YESTERDAYDELIBILLS,null);
    }

    public Map<String, Object> getDayTotal() {
        return  WebServicesUtils.invokeWS(CommonUtil.WSDLUrl,
                CommonUtil.WSDLNameSpace,CommonUtil.TMS_YESTERDAYBILLS,null);
    }

    public Map<String, Object> getMonthTotal() {
        return  WebServicesUtils.invokeWS(CommonUtil.WSDLUrl,
                CommonUtil.WSDLNameSpace,CommonUtil.TMS_LASTMONTH,null);
    }
}
