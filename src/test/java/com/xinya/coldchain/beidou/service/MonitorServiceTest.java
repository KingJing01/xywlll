package com.xinya.coldchain.beidou.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
/**
 * Created by Administrator on 2019/2/15.
 */
public class MonitorServiceTest {
    @Autowired
    MonitorService ser;
    @Test
    public void insertMonitorRunData() throws Exception {
        ser.insertMonitorRunData();
    }

}