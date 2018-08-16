package com.xinya.coldchain;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;

/**
 * SpringBoot启动界面.
 */

@SpringBootApplication
@MapperScan("com.xinya.coldchain.mapper")
public class ColdchainApplication {
    public static void main(String[] args) {
        SpringApplication.run(ColdchainApplication.class, args);
    }
}
