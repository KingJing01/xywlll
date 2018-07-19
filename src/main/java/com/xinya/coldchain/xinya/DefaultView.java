package com.xinya.coldchain.xinya;

import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

/**
 * @deprecated 自定义界面跳转.
 * @date 2018-7-19
 * @author  liyoujing
 */
public class DefaultView extends WebMvcConfigurationSupport {


    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        super.addViewControllers(registry);
    }
}
