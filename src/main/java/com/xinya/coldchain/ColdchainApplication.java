package com.xinya.coldchain;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * SpringBoot启动界面.
 */
@SpringBootApplication
@EnableCaching
@MapperScan("com.xinya.coldchain.*")
public class ColdchainApplication {

    public static void main(String[] args) {
        SpringApplication.run(ColdchainApplication.class, args);
    }
}
