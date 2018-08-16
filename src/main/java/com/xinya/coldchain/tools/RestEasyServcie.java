package com.xinya.coldchain.tools;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jboss.resteasy.client.jaxrs.ResteasyClient;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.jboss.resteasy.client.jaxrs.ResteasyWebTarget;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;

/**
 * @deprecated  后台发送请求
 * @author liyoujing
 * @date 2018-7-20
 */
public class RestEasyServcie {

    public static ObjectMapper MAPPER = new ObjectMapper().setSerializationInclusion(JsonInclude
            .Include.ALWAYS);

    /**
     * post.
     *
     * @param url        url
     * @param jsonString jsonString
     * @return value
     */
    public static String post(String url, String jsonString) {
        ResteasyClient client = new ResteasyClientBuilder().build();
        ResteasyWebTarget target = client.target(url);
        Response response = target.request().post(Entity.entity(jsonString, "application/json"));
        String value = response.readEntity(String.class);
        return value;
    }

    /**
     * get.
     *
     * @param url
     * @return
     */
    public static String get(String url) {
        ResteasyClient client = new ResteasyClientBuilder().build();
        ResteasyWebTarget target = client.target(url);
        Response response = target.request().get();
        String value = response.readEntity(String.class);
        return value;
    }


}
