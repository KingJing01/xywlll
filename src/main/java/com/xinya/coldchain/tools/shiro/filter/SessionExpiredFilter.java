package com.xinya.coldchain.tools.shiro.filter;

import com.xinya.coldchain.sys.model.TmsUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.web.filter.PathMatchingFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * shiro session 自定义拦截器
 * 拦截 ajax请求，当session失效的时候,ajax返回403
 *
 * @author liyoujing
 */
public class SessionExpiredFilter extends PathMatchingFilter {
    private static final Logger logger = LoggerFactory.getLogger(SessionExpiredFilter.class);

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        TmsUser user = (TmsUser) SecurityUtils.getSubject().getPrincipal();
        if (user == null) {
            logger.info("---------- session 过期的处理 ------------");
            if ("XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"))) {
                //ajax的sesson处理
                onLoginFail(response);
                return false;
            } else {
                //普通的处理，直接给到下一个拦截器
                return true;
            }
        } 
        return true;
    }

    //session过期给403状态码
    private void onLoginFail(ServletResponse response) throws IOException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setStatus(403);
        httpResponse.getWriter().write("session超时了");
    }
}
