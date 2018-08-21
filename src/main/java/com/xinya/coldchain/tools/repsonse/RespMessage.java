package com.xinya.coldchain.tools.repsonse;

/**
 * 返回消息信息实体封装.
 *
 */
public class RespMessage {
    private String message;
    private int success;
    private Object data;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getSuccess() {
        return success;
    }

    public void setSuccess(int success) {
        this.success = success;
    }

    public Object getObejct() {
        return data;
    }

    public void setObejct(Object obejct) {
        this.data = data;
    }

    public RespMessage(String message, int success, Object data) {
        this.message = message;
        this.success = success;
        this.data = data;
    }

    public RespMessage(String message, int success) {
        this.message = message;
        this.success = success;
    }

    public RespMessage(int success) {
        this.success = success;
    }

    @Override
    public String toString() {
        return "RespMessage{" +
                "message='" + message + '\'' +
                ", success=" + success +
                ", data=" + data +
                '}';
    }
}
