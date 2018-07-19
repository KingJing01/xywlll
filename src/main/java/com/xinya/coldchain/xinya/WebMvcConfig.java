package com.xinya.coldchain.xinya;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author liyoujing
 * @create 2018-07-19 下午 01:57
 * @desc 自定义路径跳转
 **/
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("../login.html");
        registry.addViewController("/login").setViewName("index.html");
    }
}
