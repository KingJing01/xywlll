package com.xinya.coldchain.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMAT_YYYYMM = "yyyy-MM";
    public static final String DATE_FORMAT_YYYYMMDD = "yyyy-MM-dd";
    public static final String DATE_FORMAT_YYYYMMDDHHMMSSSSS = "yyyy-MM-dd HH:mm:ss.SSS";
    private static final String[] MONTH_STRING = {"January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"};
    public static String FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static String FORMAT_NOT_TIME = "yyyy-MM-dd";
    public static String FORMAT_LONG = "yyyyMMddHHmmssms";
    public static String FORMAT_SHORT = "yyMMdd";
    public static String YEAR_MONTH = "yyyy-MM";

    public static Date stringToDate(String str) {
        return stringToDate(str, FORMAT_NOT_TIME);
    }

    public static Date stringToDate(String str, String dateFormat) {
        DateFormat format = new SimpleDateFormat(dateFormat);
        Date date = null;
        try {
            date = format.parse(str);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    public static String dateToString(Date dateVal) {
        return dateToString(dateVal, FORMAT);
    }

    public static String dateToString(Date dateVal, String format) {
        if (dateVal != null) {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            return sdf.format(dateVal);
        } else {
            return "";
        }
    }
}
