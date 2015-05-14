var md5 = function () {
    var t = [];
    for (var i = 1; i < 64; i++) {
        //t(i) = floor(2^32 * abs(sin(i)))
        t.push(Math.floor(4294967296 * Math.abs(Math.sin(i))))
    }

    var r = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function H(x, y, z) {
        return x ^ y ^ z;
    }
    function I(x, y, z) {
        return y ^ (x | (~z));
    }

    function FF(a, b, c, d, mj, s, ti) {
        return b + ((a + F(b, c, d) + mj + ti) << s);
    }
    function GG(a, b, c, d, mj, s, ti) {
        return b + ((a + G(b, c, d) + mj + ti) << s);
    }
    function HH(a, b, c, d, mj, s, ti) {
        return b + ((a + H(b, c, d) + mj + ti) << s);
    }
    function II(a, b, c, d, mj, s, ti) {
        return b + ((a + I(b, c, d) + mj + ti) << s);
    }

    // loop left shift
    function leftrot(x, n) {
        return (x << n) | (x >>> (32 - n))
    }

    // 相加且舍去超过32bit的高位部分
    function add32bit(a, b) {
        return (a + b) >>> 0;
    }

    return function (s) {
        var charCode,
            bitLength,
            m = [],
            bytes = [];

        var A = 0x67452301,
            B = 0xefcdab89,
            C = 0x98badcfe,
            D = 0x10325476;

        for (var i = 0; i < s.length; i++) {
            charCode = s.charCodeAt(i);
            if (charCode > 0xff) {
                bytes.push(charCode >> 8);
                bytes.push(charCode & 0x00ff);
            } else {
                bytes.push(charCode);
            }
        }

        bitLength = bytes.length * 8;

        for (var i = 0; i < (448 - bitLength) / 8; i++) {
            bytes.push(0);
        }

        if (bitLength > 0xff) {
            bytes.push(bitLength >> 8);
            bytes.push(charCode & 0x00ff);
        } else {
            bytes.push(bitLength);
        }

        for (var i = 0; i < 512 / 8 - bytes.length; i++) {
            bytes.push(0);
        }

        var str = '';
        for (var i = 0; i < bytes.length; i++) {
            str += bytes[i].toString(16) + ',';
        }
        console.log(str);

        for (var i = 0, j = 0; i < bytes.length; i += 4, j++) {
            m[j] = bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3];
        }

        var str = '';
        for (var i = 0; i < m.length; i++) {
            str += m[i].toString(16) + ',';
        }
        console.log(str);

        var a = A, b = B, c = C, d = D, a1, k, f;

        // main loop
        for (var i = 1; i <= m.length / 16; i++) {
            for (var j = 0; j < 64; j++) {
                if (j < 16) {
                    f = F(b, c, d);
                    k = j;
                } else if (j < 32) {
                    f = G(b, c, d);
                    k = (1 + 5 * j) % 16;
                } else if (j < 48) {
                    f = H(b, c, d);
                    k = (5 + 3 * j) % 16;
                } else if (j < 64) {
                    f = I(b, c, d);
                    k = (7 * j) % 16;
                }

                a = add32bit(b, leftrot(add32bit(add32bit(add32bit(a, f), m[k * i]), t[j]), r[j]));

                a1 = a;
                a = d;
                b = a1;
                c = b;
                d = c;
            }

            A = (A + a) >>> 0;
            A = (B + b) >>> 0;
            C = (C + c) >>> 0;
            D = (D + d) >>> 0;
        }

        console.log(a.toString(16) + b.toString(16) + c.toString(16) + d.toString(16));
    }
}();


