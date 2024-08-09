function h2d(s: string) {
    function add(x: string, y: string): string {
        let c = 0;
        const r: number[] = [];
        const xArr = x.split("").map(Number);
        const yArr = y.split("").map(Number);
        while (xArr.length || yArr.length) {
            const s = (xArr.pop() || 0) + (yArr.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10);
            c = s < 10 ? 0 : 1;
        }
        if (c) r.unshift(c);
        return r.join("");
    }

    let dec = "0";
    s.split("").forEach(function (chr) {
        const n = parseInt(chr, 16);
        for (let t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if (n & t) dec = add(dec, "1");
        }
    });
    return dec;
}

export const generateSalt = () => {
    const genRanHex = (size: number): string =>
        [...Array(size)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("");
    const hex = genRanHex(64);
    const dec = h2d(hex);
    return dec;
};
