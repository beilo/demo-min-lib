import type { IApi } from 'umi';
const config = require('./config');
console.log('config', config)
export default (api: IApi) => {
    // https://github.com/umijs/umi-next/issues/868
    api.modifyHTML(($) => {
        $('head').append([
            `<meta charset="UTF-8">`,
            `<meta name="format-detection" content="telephone=no" />`,
            `<meta name=”renderer” content=”webkit”>`,
            `<link rel="dns-prefetch" href="//gateway.codemao.cn">`,
            `<link rel="dns-prefetch" href="//online-education.codemao.cn">`,
            `<title>编程猫</title>`,
            `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">`,
        ]);
        if (config.env === 'local') {
            $('head').append([`<script>window.CODEMAOCONFIG = ${JSON.stringify(config.runtime)}</script>`])
        }
        $('body').append([
            `<script src="//res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>`
        ])

        return $;
    });
};