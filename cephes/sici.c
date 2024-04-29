/*							sici.c
 *
 *	Sine and cosine integrals
 *
 *
 *
 * SYNOPSIS:
 *
 * double x, Ci, Si, sici();
 *
 * sici( x, &Si, &Ci );
 *
 *
 * DESCRIPTION:
 *
 * Evaluates the integrals
 *
 *                          x
 *                          -
 *                         |  cos t - 1
 *   Ci(x) = eul + ln x +  |  --------- dt,
 *                         |      t
 *                        -
 *                         0
 *             x
 *             -
 *            |  sin t
 *   Si(x) =  |  ----- dt
 *            |    t
 *           -
 *            0
 *
 * where eul = 0.57721566490153286061 is Euler's constant.
 * The integrals are approximated by rational functions.
 * For x > 8 auxiliary functions f(x) and g(x) are employed
 * such that
 *
 * Ci(x) = f(x) sin(x) - g(x) cos(x)
 * Si(x) = pi/2 - f(x) cos(x) - g(x) sin(x)
 *
 *
 * ACCURACY:
 *    Test interval = [0,50].
 * Absolute error, except relative when > 1:
 * arithmetic   function   # trials      peak         rms
 *    IEEE        Si        30000       4.4e-16     7.3e-17
 *    IEEE        Ci        30000       6.9e-16     5.1e-17
 *    DEC         Si         5000       4.4e-17     9.0e-18
 *    DEC         Ci         5300       7.9e-17     5.2e-18
 */

/*
Cephes Math Library Release 2.1:  January, 1989
Copyright 1984, 1987, 1989 by Stephen L. Moshier
Direct inquiries to 30 Frost Street, Cambridge, MA 02140
*/

#include "mconf.h"

#ifdef UNK
static double SN[] = {
    -8.39167827910303881427E-11, 4.62591714427012837309E-8,
    -9.75759303843632795789E-6,  9.76945438170435310816E-4,
    -4.13470316229406538752E-2,  1.00000000000000000302E0,
};
static double SD[] = {
    2.03269266195951942049E-12, 1.27997891179943299903E-9,
    4.41827842801218905784E-7,  9.96412122043875552487E-5,
    1.42085239326149893930E-2,  9.99999999999999996984E-1,
};
#endif
#ifdef DEC
static unsigned short SN[] = {
    0127670, 0104362, 0167505, 0035161, 0032106, 0127177, 0032131, 0056461,
    0134043, 0132213, 0000476, 0172351, 0035600, 0006331, 0064761, 0032665,
    0137051, 0055601, 0044667, 0017645, 0040200, 0000000, 0000000, 0000000,
};
static unsigned short SD[] = {
    0026417, 0004674, 0052064, 0001573, 0030657, 0165501, 0014666, 0131526,
    0032755, 0032133, 0034147, 0024124, 0034720, 0173167, 0166624, 0154477,
    0036550, 0145336, 0063534, 0063220, 0040200, 0000000, 0000000, 0000000,
};
#endif
#ifdef IBMPC
static unsigned short SN[] = {
    0xa74e, 0x5de8, 0x111e, 0xbdd7, 0x2ba6, 0xe68b, 0xd5cf, 0x3e68,
    0xde9d, 0x6027, 0x7691, 0xbee4, 0x26b7, 0x2d3e, 0x019b, 0x3f50,
    0xe3f5, 0x2936, 0x2b70, 0xbfa5, 0x0000, 0x0000, 0x0000, 0x3ff0,
};
static unsigned short SD[] = {
    0x806f, 0x8a86, 0xe137, 0x3d81, 0xd66b, 0x2336, 0xfd68, 0x3e15,
    0xe50a, 0x670c, 0xa68b, 0x3e9d, 0x9b28, 0xfdb2, 0x1ece, 0x3f1a,
    0x8cd2, 0xcceb, 0x195b, 0x3f8d, 0x0000, 0x0000, 0x0000, 0x3ff0,
};
#endif
#ifdef MIEEE
static unsigned short SN[] = {
    0xbdd7, 0x111e, 0x5de8, 0xa74e, 0x3e68, 0xd5cf, 0xe68b, 0x2ba6,
    0xbee4, 0x7691, 0x6027, 0xde9d, 0x3f50, 0x019b, 0x2d3e, 0x26b7,
    0xbfa5, 0x2b70, 0x2936, 0xe3f5, 0x3ff0, 0x0000, 0x0000, 0x0000,
};
static unsigned short SD[] = {
    0x3d81, 0xe137, 0x8a86, 0x806f, 0x3e15, 0xfd68, 0x2336, 0xd66b,
    0x3e9d, 0xa68b, 0x670c, 0xe50a, 0x3f1a, 0x1ece, 0xfdb2, 0x9b28,
    0x3f8d, 0x195b, 0xcceb, 0x8cd2, 0x3ff0, 0x0000, 0x0000, 0x0000,
};
#endif
#ifdef UNK
static double CN[] = {
    2.02524002389102268789E-11, -1.35249504915790756375E-8,
    3.59325051419993077021E-6,  -4.74007206873407909465E-4,
    2.89159652607555242092E-2,  -1.00000000000000000080E0,
};
static double CD[] = {
    4.07746040061880559506E-12, 3.06780997581887812692E-9,
    1.23210355685883423679E-6,  3.17442024775032769882E-4,
    5.10028056236446052392E-2,  4.00000000000000000080E0,
};
#endif
#ifdef DEC
static unsigned short CN[] = {
    0027262, 0022131, 0160257, 0020166, 0131550, 0055534, 0077637, 0000557,
    0033561, 0021622, 0161463, 0026575, 0135370, 0102053, 0116333, 0000466,
    0036754, 0160454, 0122022, 0024622, 0140200, 0000000, 0000000, 0000000,
};
static unsigned short CD[] = {
    0026617, 0073177, 0107543, 0104425, 0031122, 0150573, 0156453, 0041517,
    0033245, 0057301, 0077706, 0110510, 0035246, 0067130, 0165424, 0044543,
    0037120, 0164121, 0061206, 0053657, 0040600, 0000000, 0000000, 0000000,
};
#endif
#ifdef IBMPC
static unsigned short CN[] = {
    0xe40f, 0x3c15, 0x448b, 0x3db6, 0xe02e, 0x8ff3, 0x0b6b, 0xbe4d,
    0x65b0, 0x5c66, 0x2472, 0x3ece, 0x6027, 0x739b, 0x1085, 0xbf3f,
    0x4532, 0x9482, 0x9c25, 0x3f9d, 0x0000, 0x0000, 0x0000, 0xbff0,
};
static unsigned short CD[] = {
    0x7123, 0xf1ec, 0xeecf, 0x3d91, 0x686a, 0x7ba5, 0x5a2f, 0x3e2a,
    0xd229, 0x2ff8, 0xabd8, 0x3eb4, 0x892c, 0x1d62, 0xcdcb, 0x3f34,
    0xcaf6, 0x2c50, 0x1d0a, 0x3faa, 0x0000, 0x0000, 0x0000, 0x4010,
};
#endif
#ifdef MIEEE
static unsigned short CN[] = {
    0x3db6, 0x448b, 0x3c15, 0xe40f, 0xbe4d, 0x0b6b, 0x8ff3, 0xe02e,
    0x3ece, 0x2472, 0x5c66, 0x65b0, 0xbf3f, 0x1085, 0x739b, 0x6027,
    0x3f9d, 0x9c25, 0x9482, 0x4532, 0xbff0, 0x0000, 0x0000, 0x0000,
};
static unsigned short CD[] = {
    0x3d91, 0xeecf, 0xf1ec, 0x7123, 0x3e2a, 0x5a2f, 0x7ba5, 0x686a,
    0x3eb4, 0xabd8, 0x2ff8, 0xd229, 0x3f34, 0xcdcb, 0x1d62, 0x892c,
    0x3faa, 0x1d0a, 0x2c50, 0xcaf6, 0x4010, 0x0000, 0x0000, 0x0000,
};
#endif

#ifdef UNK
static double FN4[] = {
    4.23612862892216586994E0,  5.45937717161812843388E0,
    1.62083287701538329132E0,  1.67006611831323023771E-1,
    6.81020132472518137426E-3, 1.08936580650328664411E-4,
    5.48900223421373614008E-7,
};
static double FD4[] = {
    /*  1.00000000000000000000E0,*/
    8.16496634205391016773E0,  7.30828822505564552187E0,
    1.86792257950184183883E0,  1.78792052963149907262E-1,
    7.01710668322789753610E-3, 1.10034357153915731354E-4,
    5.48900252756255700982E-7,
};
#endif
#ifdef DEC
static unsigned short FN4[] = {
    0040607, 0107135, 0120133, 0153471, 0040656, 0131467, 0140424,
    0017567, 0040317, 0073563, 0121610, 0002511, 0037453, 0001710,
    0000040, 0006334, 0036337, 0024033, 0176003, 0171425, 0034744,
    0072341, 0121657, 0126035, 0033023, 0054042, 0154652, 0000451,
};
static unsigned short FD4[] = {
    /*0040200,0000000,0000000,0000000,*/
    0041002, 0121663, 0137500, 0177450, 0040751, 0156577, 0042213,
    0061552, 0040357, 0014026, 0045465, 0147265, 0037467, 0012503,
    0110413, 0131772, 0036345, 0167701, 0155706, 0160551, 0034746,
    0141076, 0162250, 0123547, 0033023, 0054043, 0056706, 0151050,
};
#endif
#ifdef IBMPC
static unsigned short FN4[] = {
    0x7ae7, 0xb40b, 0xf1cb, 0x4010, 0x83ef, 0xf822, 0xd666,
    0x4015, 0x00a9, 0x7471, 0xeeee, 0x3ff9, 0x019c, 0x0004,
    0x6079, 0x3fc5, 0x7e63, 0x7f80, 0xe503, 0x3f7b, 0xf584,
    0x3475, 0x8e9c, 0x3f1c, 0x4025, 0x5b35, 0x6b04, 0x3ea2,
};
static unsigned short FD4[] = {
    /*0x0000,0x0000,0x0000,0x3ff0,*/
    0x1fe5, 0x77e8, 0x5476, 0x4020, 0x6c6d, 0xe891, 0x3baf,
    0x401d, 0xb9d7, 0xc966, 0xe302, 0x3ffd, 0x767f, 0x7221,
    0xe2a8, 0x3fc6, 0xdc2d, 0x3b78, 0xbdf8, 0x3f7c, 0x14ed,
    0xdc95, 0xd847, 0x3f1c, 0xda45, 0x6bb8, 0x6b04, 0x3ea2,
};
#endif
#ifdef MIEEE
static unsigned short FN4[] = {
    0x4010, 0xf1cb, 0xb40b, 0x7ae7, 0x4015, 0xd666, 0xf822,
    0x83ef, 0x3ff9, 0xeeee, 0x7471, 0x00a9, 0x3fc5, 0x6079,
    0x0004, 0x019c, 0x3f7b, 0xe503, 0x7f80, 0x7e63, 0x3f1c,
    0x8e9c, 0x3475, 0xf584, 0x3ea2, 0x6b04, 0x5b35, 0x4025,
};
static unsigned short FD4[] = {
    /* 0x3ff0,0x0000,0x0000,0x0000,*/
    0x4020, 0x5476, 0x77e8, 0x1fe5, 0x401d, 0x3baf, 0xe891,
    0x6c6d, 0x3ffd, 0xe302, 0xc966, 0xb9d7, 0x3fc6, 0xe2a8,
    0x7221, 0x767f, 0x3f7c, 0xbdf8, 0x3b78, 0xdc2d, 0x3f1c,
    0xd847, 0xdc95, 0x14ed, 0x3ea2, 0x6b04, 0x6bb8, 0xda45,
};
#endif

#ifdef UNK
static double FN8[] = {
    4.55880873470465315206E-1,  7.13715274100146711374E-1,
    1.60300158222319456320E-1,  1.16064229408124407915E-2,
    3.49556442447859055605E-4,  4.86215430826454749482E-6,
    3.20092790091004902806E-8,  9.41779576128512936592E-11,
    9.70507110881952024631E-14,
};
static double FD8[] = {
    /*  1.00000000000000000000E0,*/
    9.17463611873684053703E-1,  1.78685545332074536321E-1,
    1.22253594771971293032E-2,  3.58696481881851580297E-4,
    4.92435064317881464393E-6,  3.21956939101046018377E-8,
    9.43720590350276732376E-11, 9.70507110881952025725E-14,
};
#endif
#ifdef DEC
static unsigned short FN8[] = {
    0037751, 0064467, 0142332, 0164573, 0040066, 0133013, 0050352, 0071102,
    0037444, 0022671, 0102157, 0013535, 0036476, 0024335, 0136423, 0146444,
    0035267, 0042253, 0164110, 0110460, 0033643, 0022626, 0062535, 0060320,
    0032011, 0075223, 0010110, 0153413, 0027717, 0014572, 0011360, 0014034,
    0025332, 0104755, 0004563, 0152354,
};
static unsigned short FD8[] = {
    /*0040200,0000000,0000000,0000000,*/
    0040152, 0157345, 0030104, 0075616, 0037466, 0174527, 0172740, 0071060,
    0036510, 0046337, 0144272, 0156552, 0035274, 0007555, 0042537, 0015572,
    0033645, 0035731, 0112465, 0026474, 0032012, 0043612, 0030613, 0030123,
    0027717, 0103277, 0004564, 0151000, 0025332, 0104755, 0004563, 0152354,
};
#endif
#ifdef IBMPC
static unsigned short FN8[] = {
    0x5d2f, 0xf89b, 0x2d26, 0x3fdd, 0x4e48, 0x6a1d, 0xd6c1, 0x3fe6, 0xe2ec,
    0x308d, 0x84b7, 0x3fc4, 0x79a4, 0xb7a2, 0xc51b, 0x3f87, 0x1226, 0x7d09,
    0xe895, 0x3f36, 0xac1a, 0xccab, 0x64b2, 0x3ed4, 0x1ae1, 0x6209, 0x2f52,
    0x3e61, 0x0304, 0x425e, 0xe32f, 0x3dd9, 0x7a9d, 0xa12e, 0x513d, 0x3d3b,
};
static unsigned short FD8[] = {
    /*0x0000,0x0000,0x0000,0x3ff0,*/
    0x8f72, 0xa608, 0x5bdc, 0x3fed, 0x0e46, 0xfebc, 0xdf2a, 0x3fc6,
    0x5bad, 0xf917, 0x099b, 0x3f89, 0xe36f, 0xa8ab, 0x81ed, 0x3f37,
    0xa5a8, 0x32a6, 0xa77b, 0x3ed4, 0x660a, 0x4631, 0x48f1, 0x3e61,
    0x9a40, 0xe12e, 0xf0d7, 0x3dd9, 0x7a9d, 0xa12e, 0x513d, 0x3d3b,
};
#endif
#ifdef MIEEE
static unsigned short FN8[] = {
    0x3fdd, 0x2d26, 0xf89b, 0x5d2f, 0x3fe6, 0xd6c1, 0x6a1d, 0x4e48, 0x3fc4,
    0x84b7, 0x308d, 0xe2ec, 0x3f87, 0xc51b, 0xb7a2, 0x79a4, 0x3f36, 0xe895,
    0x7d09, 0x1226, 0x3ed4, 0x64b2, 0xccab, 0xac1a, 0x3e61, 0x2f52, 0x6209,
    0x1ae1, 0x3dd9, 0xe32f, 0x425e, 0x0304, 0x3d3b, 0x513d, 0xa12e, 0x7a9d,
};
static unsigned short FD8[] = {
    /*0x3ff0,0x0000,0x0000,0x0000,*/
    0x3fed, 0x5bdc, 0xa608, 0x8f72, 0x3fc6, 0xdf2a, 0xfebc, 0x0e46,
    0x3f89, 0x099b, 0xf917, 0x5bad, 0x3f37, 0x81ed, 0xa8ab, 0xe36f,
    0x3ed4, 0xa77b, 0x32a6, 0xa5a8, 0x3e61, 0x48f1, 0x4631, 0x660a,
    0x3dd9, 0xf0d7, 0xe12e, 0x9a40, 0x3d3b, 0x513d, 0xa12e, 0x7a9d,
};
#endif

#ifdef UNK
static double GN4[] = {
    8.71001698973114191777E-2, 6.11379109952219284151E-1,
    3.97180296392337498885E-1, 7.48527737628469092119E-2,
    5.38868681462177273157E-3, 1.61999794598934024525E-4,
    1.97963874140963632189E-6, 7.82579040744090311069E-9,
};
static double GD4[] = {
    /*  1.00000000000000000000E0,*/
    1.64402202413355338886E0,  6.66296701268987968381E-1,
    9.88771761277688796203E-2, 6.22396345441768420760E-3,
    1.73221081474177119497E-4, 2.02659182086343991969E-6,
    7.82579218933534490868E-9,
};
#endif
#ifdef DEC
static unsigned short GN4[] = {
    0037262, 0060622, 0164572, 0157515, 0040034, 0101527, 0061263, 0147204,
    0037713, 0055467, 0037475, 0144512, 0037231, 0046151, 0035234, 0045261,
    0036260, 0111624, 0150617, 0053536, 0035051, 0157175, 0016675, 0155456,
    0033404, 0154757, 0041211, 0000055, 0031406, 0071060, 0130322, 0033322,
};
static unsigned short GD4[] = {
    /* 0040200,0000000,0000000,0000000,*/
    0040322, 0067520, 0046707, 0053275, 0040052, 0111153, 0126542,
    0005516, 0037312, 0100035, 0167121, 0014552, 0036313, 0171143,
    0137176, 0014213, 0035065, 0121256, 0012033, 0150603, 0033410,
    0000225, 0013121, 0071643, 0031406, 0071062, 0131152, 0150454,
};
#endif
#ifdef IBMPC
static unsigned short GN4[] = {
    0x5bea, 0x5d2f, 0x4c32, 0x3fb6, 0x79d1, 0xec56, 0x906a, 0x3fe3,
    0xb929, 0xe7e7, 0x6b66, 0x3fd9, 0x8956, 0x2753, 0x298d, 0x3fb3,
    0xeaec, 0x9a31, 0x1272, 0x3f76, 0xbb66, 0xa3b7, 0x3bcf, 0x3f25,
    0x2006, 0xe851, 0x9b3d, 0x3ec0, 0x46da, 0x161a, 0xce46, 0x3e40,
};
static unsigned short GD4[] = {
    /* 0x0000,0x0000,0x0000,0x3ff0,*/
    0xead8, 0x09b8, 0x4dea, 0x3ffa, 0x416a, 0x75ac, 0x524d,
    0x3fe5, 0x232d, 0xbdca, 0x5003, 0x3fb9, 0xc311, 0x77cf,
    0x7e4c, 0x3f79, 0x7a30, 0xc283, 0xb455, 0x3f26, 0x2e74,
    0xa2ca, 0x0012, 0x3ec1, 0x5a26, 0x564d, 0xce46, 0x3e40,
};
#endif
#ifdef MIEEE
static unsigned short GN4[] = {
    0x3fb6, 0x4c32, 0x5d2f, 0x5bea, 0x3fe3, 0x906a, 0xec56, 0x79d1,
    0x3fd9, 0x6b66, 0xe7e7, 0xb929, 0x3fb3, 0x298d, 0x2753, 0x8956,
    0x3f76, 0x1272, 0x9a31, 0xeaec, 0x3f25, 0x3bcf, 0xa3b7, 0xbb66,
    0x3ec0, 0x9b3d, 0xe851, 0x2006, 0x3e40, 0xce46, 0x161a, 0x46da,
};
static unsigned short GD4[] = {
    /*0x3ff0,0x0000,0x0000,0x0000,*/
    0x3ffa, 0x4dea, 0x09b8, 0xead8, 0x3fe5, 0x524d, 0x75ac,
    0x416a, 0x3fb9, 0x5003, 0xbdca, 0x232d, 0x3f79, 0x7e4c,
    0x77cf, 0xc311, 0x3f26, 0xb455, 0xc283, 0x7a30, 0x3ec1,
    0x0012, 0xa2ca, 0x2e74, 0x3e40, 0xce46, 0x564d, 0x5a26,
};
#endif

#ifdef UNK
static double GN8[] = {
    6.97359953443276214934E-1,  3.30410979305632063225E-1,
    3.84878767649974295920E-2,  1.71718239052347903558E-3,
    3.48941165502279436777E-5,  3.47131167084116673800E-7,
    1.70404452782044526189E-9,  3.85945925430276600453E-12,
    3.14040098946363334640E-15,
};
static double GD8[] = {
    /*  1.00000000000000000000E0,*/
    1.68548898811011640017E0,   4.87852258695304967486E-1,
    4.67913194259625806320E-2,  1.90284426674399523638E-3,
    3.68475504442561108162E-5,  3.57043223443740838771E-7,
    1.72693748966316146736E-9,  3.87830166023954706752E-12,
    3.14040098946363335242E-15,
};
#endif
#ifdef DEC
static unsigned short GN8[] = {
    0040062, 0103056, 0110624, 0033123, 0037651, 0025640, 0136266, 0145647,
    0037035, 0122566, 0137770, 0061777, 0035741, 0011424, 0065311, 0013370,
    0034422, 0055505, 0134324, 0016755, 0032672, 0056530, 0022565, 0014747,
    0030752, 0031674, 0114735, 0013162, 0026607, 0145353, 0022020, 0123625,
    0024142, 0045054, 0060033, 0016505,
};
static unsigned short GD8[] = {
    /*0040200,0000000,0000000,0000000,*/
    0040327, 0137032, 0064331, 0136425, 0037771, 0143705, 0070300, 0105711,
    0037077, 0124101, 0025275, 0035356, 0035771, 0064333, 0145103, 0105357,
    0034432, 0106301, 0105311, 0010713, 0032677, 0127645, 0120034, 0157551,
    0030755, 0054466, 0010743, 0105566, 0026610, 0072242, 0142530, 0135744,
    0024142, 0045054, 0060033, 0016505,
};
#endif
#ifdef IBMPC
static unsigned short GN8[] = {
    0x86ca, 0xd232, 0x50c5, 0x3fe6, 0xd975, 0x1796, 0x2574, 0x3fd5, 0x0c80,
    0xd7ff, 0xb4ae, 0x3fa3, 0x22df, 0x8d59, 0x2262, 0x3f5c, 0x83be, 0xb71a,
    0x4b68, 0x3f02, 0xa33d, 0x04ae, 0x4bab, 0x3e97, 0xa2ce, 0x933b, 0x4677,
    0x3e1d, 0x14f3, 0x6482, 0xf95d, 0x3d90, 0x63a9, 0x8c03, 0x4945, 0x3cec,
};
static unsigned short GD8[] = {
    /*0x0000,0x0000,0x0000,0x3ff0,*/
    0x37a3, 0x4d1b, 0xf7c3, 0x3ffa, 0x1179, 0xae18, 0x38f8, 0x3fdf, 0xa75e,
    0x2557, 0xf508, 0x3fa7, 0x715e, 0x7948, 0x2d1b, 0x3f5f, 0x2239, 0x3159,
    0x5198, 0x3f03, 0x9bed, 0xb403, 0xf5f4, 0x3e97, 0x716f, 0xc23c, 0xab26,
    0x3e1d, 0x177c, 0x58ab, 0x0e94, 0x3d91, 0x63a9, 0x8c03, 0x4945, 0x3cec,
};
#endif
#ifdef MIEEE
static unsigned short GN8[] = {
    0x3fe6, 0x50c5, 0xd232, 0x86ca, 0x3fd5, 0x2574, 0x1796, 0xd975, 0x3fa3,
    0xb4ae, 0xd7ff, 0x0c80, 0x3f5c, 0x2262, 0x8d59, 0x22df, 0x3f02, 0x4b68,
    0xb71a, 0x83be, 0x3e97, 0x4bab, 0x04ae, 0xa33d, 0x3e1d, 0x4677, 0x933b,
    0xa2ce, 0x3d90, 0xf95d, 0x6482, 0x14f3, 0x3cec, 0x4945, 0x8c03, 0x63a9,
};
static unsigned short GD8[] = {
    /*0x3ff0,0x0000,0x0000,0x0000,*/
    0x3ffa, 0xf7c3, 0x4d1b, 0x37a3, 0x3fdf, 0x38f8, 0xae18, 0x1179, 0x3fa7,
    0xf508, 0x2557, 0xa75e, 0x3f5f, 0x2d1b, 0x7948, 0x715e, 0x3f03, 0x5198,
    0x3159, 0x2239, 0x3e97, 0xf5f4, 0xb403, 0x9bed, 0x3e1d, 0xab26, 0xc23c,
    0x716f, 0x3d91, 0x0e94, 0x58ab, 0x177c, 0x3cec, 0x4945, 0x8c03, 0x63a9,
};
#endif

#ifdef ANSIPROT
extern double log(double);
extern double sin(double);
extern double cos(double);
extern double polevl(double, void *, int);
extern double p1evl(double, void *, int);
#else
double log(), sin(), cos(), polevl(), p1evl();
#endif
#define EUL 0.57721566490153286061
extern double MAXNUM, PIO2, MACHEP;

int sici(x, si, ci) double x;
double *si, *ci;
{
  double z, c, s, f, g;
  short sign;

  if (x < 0.0) {
    sign = -1;
    x = -x;
  } else
    sign = 0;

  if (x == 0.0) {
    *si = 0.0;
    *ci = -MAXNUM;
    return (0);
  }

  if (x > 1.0e9) {
    *si = PIO2 - cos(x) / x;
    *ci = sin(x) / x;
    return (0);
  }

  if (x > 4.0)
    goto asympt;

  z = x * x;
  s = x * polevl(z, SN, 5) / polevl(z, SD, 5);
  c = z * polevl(z, CN, 5) / polevl(z, CD, 5);

  if (sign)
    s = -s;
  *si = s;
  *ci = EUL + log(x) + c; /* real part if x < 0 */
  return (0);

  /* The auxiliary functions are:
   *
   *
   * *si = *si - PIO2;
   * c = cos(x);
   * s = sin(x);
   *
   * t = *ci * s - *si * c;
   * a = *ci * c + *si * s;
   *
   * *si = t;
   * *ci = -a;
   */

asympt:

  s = sin(x);
  c = cos(x);
  z = 1.0 / (x * x);
  if (x < 8.0) {
    f = polevl(z, FN4, 6) / (x * p1evl(z, FD4, 7));
    g = z * polevl(z, GN4, 7) / p1evl(z, GD4, 7);
  } else {
    f = polevl(z, FN8, 8) / (x * p1evl(z, FD8, 8));
    g = z * polevl(z, GN8, 8) / p1evl(z, GD8, 9);
  }
  *si = PIO2 - f * c - g * s;
  if (sign)
    *si = -(*si);
  *ci = f * s - g * c;

  return (0);
}
