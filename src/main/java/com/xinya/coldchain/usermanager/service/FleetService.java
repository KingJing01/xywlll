package com.xinya.coldchain.usermanager.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xinya.coldchain.sys.mapper.SysMapper;
import com.xinya.coldchain.usermanager.mapper.FleetMapper;
import com.xinya.coldchain.usermanager.model.Fleet;
import com.xinya.coldchain.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class FleetService {
    @Autowired
    private FleetMapper fleetMapper;

    @Autowired
    private SysMapper sysMapper;

    public PageInfo<Fleet> getListData(int pageSize, int pageNum, String code) {
        PageHelper.startPage(pageNum, pageSize);
        List<Fleet> list = fleetMapper.getListData(code);
        PageInfo<Fleet> pageInfo = new PageInfo<>(list);
        return pageInfo;
    }

    public Map<String, String> getFleetInfo(String pkCarrier, int carrType) {
        Map<String, String> resultMap = null;
        if (CommonUtil.fleetPerson == carrType) {
            resultMap = fleetMapper.getFleetPersonInfo(pkCarrier);
        } else {
            resultMap = fleetMapper.getFleetEntInfo(pkCarrier);
            StringBuffer buffer = new StringBuffer();
            if (!StringUtils.isEmpty(resultMap.get("trans_type"))) {
                String transType = resultMap.get("trans_type");
                String[] arr = transType.split(",");
                int arrlength = arr.length;
                //企业级用户判断运输类型
                List<Map<String, String>> list = sysMapper.getDictonaryData("trans_type");
                for (Map<String, String> data : list) {
                    for (int i = 0; i < arrlength; i++) {
                        if (data.get("value").equals(arr[i])) {
                            buffer.append(data.get("display_name"));
                            buffer.append("\t");
                        }
                    }
                }
            }
            if (!StringUtils.isEmpty(buffer)) {
                resultMap.put("trans_type", buffer.toString());
            }
        }
        return resultMap;
    }

    public int updatelockedFlag(String pkCarrier, String status) {
        return fleetMapper.updatelockedFlag(pkCarrier, status);
    }
}
