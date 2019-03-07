package com.xinya.coldchain.utils;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Random;
import java.util.Set;

/**
 * 随机生成指定位数的唯一码
 * @author  liyoujing
 */
public class RandomCodeUtil {

    public static Set<String> getletterandnum(int length) {
        Set<String> set = new HashSet<String>();
        for (int i = 0; i < length; i++) {
            String value = getrandom();
            set.add(value);
        }
        if (set.size() < length) {
            String value = getrandom();
            set.add(value);
        }
        return set;
    }

    //随机生成数字和字母
    private static String getrandom() {
        String value = "";
        Random random = new Random();
        int gen = random.nextInt(2);
        String charornum = gen % 2 == 0 ? "char" : "num";
        if ("char".equals(charornum)) {
            int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;
            int ascii = random.nextInt(26);
            value += (char) (ascii + temp);
        } else if ("num".equalsIgnoreCase(charornum)) {
            value += String.valueOf(random.nextInt(10));
        }
        return value;
    }

    public static String generaRandom(int length) {
        StringBuffer buffer = new StringBuffer();
        Set<String> store = getletterandnum(length);
        Iterator iterator = store.iterator();
        while (iterator.hasNext()) {
            buffer.append((String) iterator.next());
        }
        return buffer.toString();
    }
}
