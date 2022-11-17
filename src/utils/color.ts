/**
 * @desc 判断是否十六进制颜色值
 */
export function isHexColor(color: string) {
    const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/;
    return reg.test(color)
}

/**
 * @desc 根据传递的百分比点亮6个字符的HEX颜色
 */
export function lighten(color: string, amount: number) {
    color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
    amount = Math.trunc((255 * amount) / 100);
    return `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`
}

/**
 * @desc 将传递的百分比与十六进制颜色的R、G或B相加
 * @param color 
 * @param amount 
 * @returns 
 */
function addLight(color: string, amount: number) {
    const cc = parseInt(color, 16) + amount;
    const c = cc > 255 ? 255 : cc;
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

/**
 * @desc 讲哈希颜色转换为RGB格式
 */
export function hexToRGB(hex: string) {
    let sHex = hex.toLowerCase();
    if (isHexColor(hex)) {
        if (sHex.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1))
            }
            sHex = sColorNew
        }
        const sColorChange: number[] = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseFloat("0x" + sHex.slice(i, i + 2)));
        }
        return `RGB(${sColorChange.join(",")})`
    }
    return sHex
}

/**
 * @desc 颜色是否是深色
 */
export function colorIsDark(color: string) {
    if (!isHexColor(color)) return;
    const [r, g, b] = hexToRGB(color).replace(/(?:\(|\)|rgb|RGB)*/g, '')
        .split(',')
        .map((item) => Number(item));
    return r * 0.299 + g * 0.578 + b * 0.114 < 192;
}

/**
 * @desc 给定通过的百分比，使HEX颜色变暗
 */

export function darken(color: string, amount: number) {
    color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color;
    amount = Math.trunc((255 * amount) / 100);
    return `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
        color.substring(2, 4),
        amount,
    )}${subtractLight(color.substring(4, 6), amount)}`;
}

/**
 * @desc 将指示的百分比减去十六进制颜色的R、G或B
 */
function subtractLight(color: string, amount: number) {
    const cc = parseInt(color, 16) - amount;
    const c = cc < 0 ? 0 : cc;
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}
