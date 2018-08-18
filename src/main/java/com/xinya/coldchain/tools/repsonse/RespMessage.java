package com.xinya.coldchain.tools.repsonse;

/**
 * 返回消息信息实体封装.
 *
 */
public class RespMessage {
    private String message;
    private int success;
    private Object obejct;

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
        return obejct;
    }

    public void setObejct(Object obejct) {
        this.obejct = obejct;
    }

    public RespMessage(String message, int success, Object obejct) {
        this.message = message;
        this.success = success;
        this.obejct = obejct;
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
                ", obejct=" + obejct +
                '}';
    }
}
