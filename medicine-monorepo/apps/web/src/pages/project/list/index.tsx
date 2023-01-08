import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Table, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import { Link } from 'umi';

type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
        title: "序号"
    },
    {
        title: '标题',
        dataIndex: 'title',
        copyable: true,
        ellipsis: true,
        tip: '标题过长会自动收缩',
    },
    {
        title: '试验分期',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        ellipsis: true,
    },
    {
        title: '药物名称',
        dataIndex: 'labels',
        copyable: true,
        ellipsis: true,
        search: false,
        render: (_, record) => (
            <Space>
                {record.labels.map(({ name, color }) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },
    {
        title: '适应症',
        key: 'showTime',
        dataIndex: 'created_at',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
        copyable: true,
        ellipsis: true,
    },
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <Link to={`/project/edit?id=${1}&type=edit`} key="view-edit">编辑</Link>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                删除
            </a>,
        ],
    },
];

export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <ProTable<GithubIssueItem>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params = {}, sort, filter) => {
                console.log(sort, filter);
                return request<{
                    data: GithubIssueItem[];
                }>('https://proapi.azurewebsites.net/github/issues', {
                    params,
                });
            }}
            editable={{
                type: 'multiple',
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="项目列表"
            toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined />} type="primary">
                    新建
                </Button>,
            ]}
            // 选择框
            rowSelection={{
                // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                // 注释该行则默认不显示下拉选项
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                defaultSelectedRowKeys: [1],
            }}
        // tableAlertOptionRender={() => {
        //     return (
        //         <Space size={16}>
        //             <a>批量删除</a>
        //             <a>导出数据</a>
        //         </Space>
        //     );
        // }}
        />
    );
};