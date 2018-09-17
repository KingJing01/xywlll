package com.xinya.coldchain.tools.shiro.filter;

import com.google.gson.Gson;
import org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class ShiroPermissionsFilter extends PermissionsAuthorizationFilter {

    private static final Logger logger = LoggerFactory.getLogger(ShiroPermissionsFilter.class);


}
