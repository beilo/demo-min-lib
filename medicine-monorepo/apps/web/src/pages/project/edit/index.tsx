import {
    FooterToolbar,
    ProForm,
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormDigit,
    ProFormRadio,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
import type { FormLayout } from 'antd/es/form/Form';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {


    return (
        <ProForm<{
            name: string;
            company?: string;
            useMode?: string;
        }>
            layout={'horizontal'}
            rowProps={{
                gutter: [16, 0],
            }}
            submitter={{
                render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }}
            onFinish={async (values) => {
                await waitTime(2000);
                console.log(values);
                message.success('提交成功');
            }}
            params={{}}
            request={async () => {
                await waitTime(100);
                return {
                    name: '我是标题',
                };
            }}
        >
            <ProFormText name="name" label="标题" placeholder="请输入标题" />
            <h2>项目基本信息</h2>
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="试验分期" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="适应症" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="试验名称" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="拜访科室" />
            {/* 文件上传 */}
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="报名材料" />

            <h2>治疗方案</h2>
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="试验药物" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="药物介绍" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="试验药组" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="对照药组" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="用药方案" />

            <h2>入排标准</h2>
            <ProFormTextArea colProps={{ md: 12, xl: 8 }} name="company" label="简要入排" />
            <ProFormTextArea colProps={{ md: 12, xl: 8 }} name="company" label="完整入排" />
            <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="研究中心" />
            <div style={{ height: 100 }}></div>
        </ProForm>
    );
};