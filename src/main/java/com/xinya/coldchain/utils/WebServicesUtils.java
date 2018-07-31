package com.xinya.coldchain.utils;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;

import javax.xml.namespace.QName;
import java.util.HashMap;
import java.util.Map;


public class WebServicesUtils {
	public static Map invokeWS(String wsdlUrl, String nameSpaceUri,String method, Object[] params) {
		Map result = null;
		try {
			// 创建调用对象
			Service service = new Service();
			Call call = null;
			call = (Call) service.createCall();
			// 调用 getMessage
			call.setOperationName(new QName(nameSpaceUri, method));
			call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
			result = (Map) call.invoke(params);
		} catch (Exception e) {
			e.printStackTrace();
			result = new HashMap();
			result.put("success", false);
			result.put("msg", e.getMessage());
		}
		return result;
	}
}
